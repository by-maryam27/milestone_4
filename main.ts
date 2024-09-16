document.getElementById('resumeform')?.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form elements
  const nameElement = document.getElementById('name') as HTMLInputElement | null;
  const emailElement = document.getElementById('email') as HTMLInputElement | null;
  const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
  const educationElement = document.getElementById('education') as HTMLTextAreaElement | null;
  const skillsElement = document.getElementById('skills') as HTMLTextAreaElement | null;
  const experienceElement = document.getElementById('experience') as HTMLTextAreaElement | null;
  const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement | null;

  if (nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const skills = skillsElement.value;
      const experience = experienceElement.value;

      // For profile picture upload
      let profilePictureURL = '';
      if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
              if (e.target?.result) {
                  profilePictureURL = e.target.result as string;
                  updateResumeOutput(name, email, phone, education, skills, experience, profilePictureURL);
              }
          };
          reader.readAsDataURL(profilePictureElement.files[0]);
      } else {
          // If no profile picture, proceed without it
          updateResumeOutput(name, email, phone, education, skills, experience, profilePictureURL);
      }
  } else {
      console.error('One or more form elements are missing!');
  }
});

function updateResumeOutput(name: string, email: string, phone: string, education: string, skills: string, experience: string, profilePictureURL: string) {
  // Creating resume output
  const resumeOutputHTML = `
      <h2>Resume</h2>
      ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="output-img">` : ''}
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <h3>Education</h3>
      <p>${education}</p>
      <h3>Skills</h3>
      <p>${skills}</p>
      <h3>Experience</h3>
      <p>${experience}</p>
  `;

  const resumeOutputElement = document.getElementById('resumeOutput');
  if (resumeOutputElement) {
      resumeOutputElement.innerHTML = resumeOutputHTML;
      makeEditable();
  } else {
      console.error('The resume output element is missing!');
  }
}

function makeEditable() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach((element) => {
      element.addEventListener('click', function () {
          const currentElement = element as HTMLElement;
          const currentValue = currentElement.textContent || "";

          // Replace content with an input field
          if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
              const input = document.createElement('input');
              input.type = 'text';
              input.value = currentValue;
              input.classList.add('editing-input');

              input.addEventListener('blur', function () {
                  currentElement.textContent = input.value;
                  currentElement.style.display = 'inline';
                  input.remove();
              });

              currentElement.style.display = 'none';
              currentElement.parentNode?.insertBefore(input, currentElement);
              input.focus();
          }
      });
  });
}
