export function compressImageToBase64(
  file,
  maxWidth = 700,
  quality = 0.65
) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(new Error("الملف المختار ليس صورة"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = Math.round(
            height * (maxWidth / width)
          );

          width = maxWidth;
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        ctx.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        const base64 = canvas.toDataURL(
          "image/jpeg",
          quality
        );

        resolve(base64);
      };

      image.onerror = () => {
        reject(
          new Error("تعذر قراءة الصورة")
        );
      };

      image.src = event.target.result;
    };

    reader.onerror = () => {
      reject(
        new Error("تعذر قراءة الملف")
      );
    };

    reader.readAsDataURL(file);
  });
}
