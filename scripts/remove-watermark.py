import os
import glob
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageFilter
import numpy as np

def clean_image(fpath):
    try:
        img = Image.open(fpath).convert('RGB')
        w, h = img.size
        arr = np.array(img)
        
        # Bottom-right quadrant ROI
        x0, y0 = int(w * 0.76), int(h * 0.70)
        roi = arr[y0:, x0:]
        
        r = roi[:, :, 0].astype(int)
        g = roi[:, :, 1].astype(int)
        b = roi[:, :, 2].astype(int)
        
        # Sparkle detection criteria
        mask_roi = (np.abs(r - g) < 14) & (np.abs(g - b) < 14) & (r > 60) & (r < 175)
        
        full_mask = np.zeros((h, w), dtype=np.uint8)
        full_mask[y0:, x0:] = mask_roi.astype(np.uint8) * 255
        
        mask_img = Image.fromarray(full_mask)
        # Dilate mask slightly to cleanly feather and cover the edges
        radius = 9 if w > 1200 else 5
        blur_r = 3 if w > 1200 else 2
        mask_dilated = mask_img.filter(ImageFilter.MaxFilter(radius)).filter(ImageFilter.GaussianBlur(blur_r))
        
        # Floor patch shifted from the left
        dx = int(w * 0.12)
        patch_arr = np.roll(arr, dx, axis=1)
        patch_img = Image.fromarray(patch_arr)
        
        # Paste healed patch over watermark
        img.paste(patch_img, (0, 0), mask_dilated)
        
        # Save back with optimal quality
        if fpath.endswith('.webp'):
            img.save(fpath, format='WEBP', quality=80)
        else:
            img.save(fpath, format='JPEG', quality=95)
            
        return True
    except Exception as e:
        print(f"Error on {fpath}: {e}")
        return False

def main():
    root = 'C:/Users/prabu/.gemini/antigravity/scratch/mach-x'
    poster = os.path.join(root, 'public', 'poster.jpg')
    desktop_frames = sorted(glob.glob(os.path.join(root, 'public', 'frames', 'desktop', '*.webp')))
    mobile_frames = sorted(glob.glob(os.path.join(root, 'public', 'frames', 'mobile', '*.webp')))
    
    all_files = [poster] + desktop_frames + mobile_frames
    print(f"[CLEANING] Removing AI watermark from {len(all_files)} images...")
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(clean_image, all_files))
        
    print(f"[COMPLETE] Successfully cleaned {sum(results)} / {len(all_files)} images!")

if __name__ == '__main__':
    main()
