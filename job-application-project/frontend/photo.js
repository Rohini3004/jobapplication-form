document.addEventListener("DOMContentLoaded", () => {
  const photoBox = document.getElementById("photoBox");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const photoText = document.getElementById("photoText");

  photoBox.addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.src = reader.result;
      photoPreview.hidden = false;
      photoText.style.display = "none";
    };
    reader.readAsDataURL(file);
  });
});
