document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("applicationForm");
  const submitBtn = document.getElementById("submitBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  const photoBox = document.getElementById("photoBox");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const photoText = document.getElementById("photoText");

  // photo preview
  photoBox.addEventListener("click", () => photoInput.click());

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

  // validation
  function validateForm() {
    let valid = true;

    form.querySelectorAll("[required]").forEach(input => {
      input.classList.remove("error");

      if (!input.value) {
        input.classList.add("error");
        valid = false;
      }
    });

    if (!valid) {
      alert("Please fill all required fields ❌");
    }

    return valid;
  }

  // SUBMIT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        alert("Submission failed ❌");
        return;
      }

      alert("Application submitted successfully ✅");

    } catch (err) {
      alert("Server not running ❌");
    }
  });

  // DOWNLOAD
  downloadBtn.addEventListener("click", async () => {
    if (!validateForm()) return;

    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: formData
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "7S_IQ_Application_Form.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      alert("Download failed ❌");
    }
  });

});
