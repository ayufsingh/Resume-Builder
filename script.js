const templateOptions = document.querySelectorAll('input[type="radio"]');
const resumePreview = document.getElementById('resumePreview');


const profileImageInput = document.getElementById('profileImage');
const previewImage = document.getElementById('previewImage');


document.getElementById('generateBtn').addEventListener('click', () => {

    const resumeData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        summary: document.getElementById('summary').value,
        jobTitle1: document.getElementById('jobTitle1').value,
        company1: document.getElementById('company1').value,
        jobDescription1: document.getElementById('jobDescription1').value,
        degree1: document.getElementById('degree1').value,
        university1: document.getElementById('university1').value,
        graduationYear1: document.getElementById('graduationYear1').value,
        skills: document.getElementById('skills').value,
        certifications: document.getElementById('certifications').value,
        
    };

 
    let selectedTemplate;
    templateOptions.forEach((option) => {
        if (option.checked) {
            selectedTemplate = option.value;
        }
    });

    fetch(`templates/template${selectedTemplate}.html`)
        .then((response) => response.text())
        .then((template) => {
      
            template = template
                .replace('{{FULL_NAME}}', resumeData.fullName)
                .replace('{{EMAIL}}', resumeData.email)
                .replace('{{PHONE}}', resumeData.phone)
                .replace('{{SUMMARY}}', resumeData.summary)
                .replace('{{JOBTITLE1}}', resumeData.jobTitle1)
                .replace('{{COMPANY1}}', resumeData.company1)
                .replace('{{JOBDESCRIPTION1}}', resumeData.jobDescription1)
                .replace('{{DEGREE1}}', resumeData.degree1)
                .replace('{{UNIVERSITY1}}', resumeData.university1)
                .replace('{{GRADUATIONYEAR1}}', resumeData.graduationYear1)
                .replace('{{SKILLS}}', resumeData.skills)
                .replace('{{CERTIFICATIONS}}', resumeData.certifications)
        
            resumePreview.innerHTML = template;
            
            const profileImageSrc = previewImage.src;
            const profileImageElements = document.querySelectorAll('.profile-image');
            profileImageElements.forEach((img) => {
                img.src = profileImageSrc;
            });
        });
});


profileImageInput.addEventListener('change', function () {
    const selectedImage = profileImageInput.files[0];

    if (selectedImage) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };

        reader.readAsDataURL(selectedImage);
    } else {
    
        previewImage.src = '';
        previewImage.style.display = 'none';
    }

    
});

document.getElementById('printBtn').addEventListener('click', function () {
    // Get the resume preview container
    var resumePreview = document.getElementById('resumePreview');

    // Open a new window for printing
    var printWindow = window.open('', '_blank');
    
    // Set the content of the new window to the resume preview HTML
    printWindow.document.write('<html><head><title>Print Resume</title></head><body>');
    printWindow.document.write('<h1>Printed Resume</h1>');
    printWindow.document.write(resumePreview.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Trigger the print function
    printWindow.print();
    printWindow.close();
});
