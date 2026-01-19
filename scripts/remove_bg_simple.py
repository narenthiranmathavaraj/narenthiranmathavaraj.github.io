from PIL import Image
import os

def remove_white_bg(input_path, output_path, threshold=200):
    """
    Converts white pixels to transparent.
    threshold: 0-255, pixels brighter than this will be made transparent.
    """
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is white-ish
            # item[0]=R, item[1]=G, item[2]=B
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                newData.append((255, 255, 255, 0)) # Make Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully saved transparent image to: {output_path}")
    except Exception as e:
        print(f"Error: {e}")

# Paths
source_image = r"C:\Users\USER\.gemini\antigravity\brain\69797e05-564f-4288-a86f-01db0aa52128\walle_cartoon_1768159361238.png"
output_image = r"c:\Users\USER\Desktop\Masters Applications\Personal Portfolio\images\walle.png"

# Run
print("Processing image...")
remove_white_bg(source_image, output_image)
