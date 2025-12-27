
/**
 * Optimizes an image file by converting it to WebP and resizing it if necessary.
 * 
 * @param file - The original File object.
 * @param maxWidth - Maximum width allowed (default 1920px).
 * @param quality - WebP quality from 0 to 1 (default 0.8).
 * @returns A Promise that resolves to the optimized File object.
 */
export const convertToWebP = async (file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> => {
    // 1. Check if it's an image and not an SVG (SVGs should remain vector)
    if (!file.type.startsWith('image/') || file.type.includes('svg')) {
      return file;
    }
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          // 2. Calculate new dimensions
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
  
          // 3. Draw to canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
              // Fallback if canvas context is not available
              resolve(file); 
              return;
          }
          
          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          // 4. Convert to WebP blob
          canvas.toBlob((blob) => {
            if (!blob) {
              resolve(file); // Fallback
              return;
            }
  
            // 5. Create new File object
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const newFile = new File([blob], newFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            
            console.log(`Image optimized: ${file.name} (${(file.size/1024).toFixed(1)}KB) -> ${newFileName} (${(newFile.size/1024).toFixed(1)}KB)`);
            resolve(newFile);
          }, 'image/webp', quality);
        };
        
        img.onerror = (error) => reject(error);
      };
      
      reader.onerror = (error) => reject(error);
    });
  };
