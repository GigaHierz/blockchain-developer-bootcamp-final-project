/**
 * converts a base64 encoded data url SVG image to a PNG image
 * @param originalBase64 data url of svg image
 * @param width target width in pixel of PNG image
 * @return {Promise<String>} resolves to png data url of the image
 */
export default function base64SvgToBase64Png(
  originalBase64: string,
  img: HTMLImageElement,
  width: number,
  name: string,
  color: string
): Promise<string | null> {
  if (name) {
    return new Promise((resolve) => {
      img.id = name;
      img.onload = async () => {
        let canvas = document.createElement("canvas");
        let ratio = img.clientWidth / img.clientHeight || 1;
        img.style.background = color;
        img.style.border = "1.5px solid #ffff11";
        img.style.width = "250px";
        canvas.width = width;
        canvas.height = width / ratio;
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          let data = canvas.toDataURL("image/png");
          resolve(data);
        } catch (e) {
          resolve(null);
        }
      };
      img.src = originalBase64;
    });
  } else {
    return new Promise(() => {
      enterValue();
    });
  }
}

const enterValue = () => {
  alert("Please enter a Value");
};
