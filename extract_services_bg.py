from PIL import Image
import collections

def get_dominant_color(image_path):
    img = Image.open(image_path)
    img = img.convert('RGB')
    # Crop to top area where the background is visible
    img = img.crop((0, 0, img.width, 200))
    img.thumbnail((200, 200))
    colors = img.getcolors(200*200)
    colors.sort(key=lambda x: x[0], reverse=True)
    print("Top colors:")
    for count, color in colors[:10]:
        print(f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}: {count}")

try:
    path = r"C:/Users/HUAWEI/.gemini/antigravity/brain/8ea39514-8af1-4f8e-8286-a32b4e321f80/uploaded_media_1769941263693.png"
    get_dominant_color(path)
except Exception as e:
    print(e)
