/**
 * Utilitaire d'optimisation et d'uniformisation des photos pour ÉPURE
 * Recadre automatiquement toute photo au ratio luxe standard 3:4 (600x800)
 * et compresse l'image pour un chargement instantané sans saturer le stockage.
 */

export interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain';
  backgroundColor?: string;
}

export const processAndStandardizeImage = (
  file: File,
  options: OptimizeImageOptions = {}
): Promise<string> => {
  const targetWidth = options.width || 600;
  const targetHeight = options.height || 800;
  const quality = options.quality || 0.85;
  const fit = options.fit || 'cover';
  const bgColor = options.backgroundColor || '#faf8f5';

  return new Promise((resolve, reject) => {
    // Vérifier que le fichier est bien une image
    if (!file.type.startsWith('image/')) {
      reject(new Error('Le fichier sélectionné doit être une image.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Impossible de charger l\'image.'));
      img.onload = () => {
        // Créer un canvas aux dimensions standards
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Impossible d\'initialiser le contexte 2D.'));
          return;
        }

        // Configuration pour une qualité optimale
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fond neutre élégant
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;
        const targetRatio = targetWidth / targetHeight;
        const sourceRatio = imgWidth / imgHeight;

        let renderWidth = targetWidth;
        let renderHeight = targetHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (fit === 'cover') {
          // Mode COVER : Remplissage complet sans bordures, parfaitement cadré 3:4
          if (sourceRatio > targetRatio) {
            // L'image est plus large -> rogner les côtés
            renderHeight = targetHeight;
            renderWidth = targetHeight * sourceRatio;
            offsetX = (targetWidth - renderWidth) / 2;
            offsetY = 0;
          } else {
            // L'image est plus haute -> rogner le haut et le bas
            renderWidth = targetWidth;
            renderHeight = targetWidth / sourceRatio;
            offsetX = 0;
            offsetY = (targetHeight - renderHeight) / 2;
          }
        } else {
          // Mode CONTAIN : Conserver toute l'image avec bandes douces
          if (sourceRatio > targetRatio) {
            renderWidth = targetWidth;
            renderHeight = targetWidth / sourceRatio;
            offsetX = 0;
            offsetY = (targetHeight - renderHeight) / 2;
          } else {
            renderHeight = targetHeight;
            renderWidth = targetHeight * sourceRatio;
            offsetX = (targetWidth - renderWidth) / 2;
            offsetY = 0;
          }
        }

        // Dessin de l'image
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

        // Export en JPEG optimisé
        try {
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(optimizedDataUrl);
        } catch {
          // Fallback PNG si échec
          resolve(canvas.toDataURL('image/png'));
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};
