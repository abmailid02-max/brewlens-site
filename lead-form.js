import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyCyEvblox9scJQLT644Xp0XGYNeFgo4Srs",
  authDomain: "brewlens-c4aff.firebaseapp.com",
  projectId: "brewlens-c4aff",
  storageBucket: "brewlens-c4aff.firebasestorage.app",
  messagingSenderId: "116359511666",
  appId: "1:116359511666:web:3728ee141335fd6d294ceb"
});
const db = getFirestore(app);

const form = document.getElementById("lead-form");
const status = document.getElementById("lead-status");
const button = form.querySelector("button[type=submit]");
if (form.dataset.interest) form.elements.interest.value = form.dataset.interest;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form.elements.website.value) return; // honeypot: bots fill this
  button.disabled = true;
  status.textContent = "Sending...";
  try {
    await addDoc(collection(db, "leads"), {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      interest: form.elements.interest.value,
      company: form.elements.company.value.trim(),
      page: location.pathname.split("/").pop() || "index.html",
      createdAt: serverTimestamp()
    });
    form.reset();
    status.textContent = "Thanks. We'll be in touch soon.";
  } catch (err) {
    console.error(err);
    status.textContent = "Could not send. Please try again, or reply to the message this link came in.";
    button.disabled = false;
    return;
  }
  button.disabled = false;
});
