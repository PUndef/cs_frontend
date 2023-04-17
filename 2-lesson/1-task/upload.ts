const FILE_TYPES = [
  "image/jpeg",
  "image/png",
];

function validFileType(file: File) {
  return FILE_TYPES.includes(file.type);
}

export const uploadImage = (evt: Event) => {
  return new Promise((resolve: (value: HTMLImageElement) => void) => {
    const element = evt.target as unknown as {files: FileList}
    const file = element?.files[0]
    var reader = new FileReader();
    if (validFileType(file)) {
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          resolve(img)
        }
        img.src = e.target?.result as string;
      }
    }
  })
}
