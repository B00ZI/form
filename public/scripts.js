
 const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Toggle menu on button click
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Change icon based on menu state
    const isOpen = navLinks.classList.contains("active");
    menuBtn.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

 








// bozi this part doesn't concern you
document.addEventListener("DOMContentLoaded", function () {
  const childName = document.getElementById("childName");
  const childAge = document.getElementById("childAge");
  const addButton = document.querySelector(".btn-add-child");
  const childrenContainer = document.getElementById("childrenContainer");

  // Store children data
  let children = [];

  addButton.addEventListener("click", () => {
    if (!childName.value || !childAge.value) {
      alert("Veuillez saisir le nom et l'âge");
      return;
    }

    const child = {
      name: childName.value.trim(),
      age: parseInt(childAge.value),
    };

    children.push(child);
    addChildToList(child);

    // Clear inputs
    childName.value = "";
    childAge.value = "";
    console.log(children);


  function addChildToList(child) {
    const childEntry = document.createElement("div");
    childEntry.className = "child-entry";
    childEntry.innerHTML = `
            <span class="child-info">${child.name} - ${child.age} ans</span>
            <button type="button" class="btn-remove">
                <i class="fas fa-times"></i>
            </button>
        `;

    const removeButton = childEntry.querySelector(".btn-remove");
    removeButton.addEventListener("click", () => {
      const index = children.findIndex(
        (c) => c.name === child.name && c.age === child.age
      );
      if (index > -1) {
        children.splice(index, 1);
      }
      childEntry.remove();
      console.log(children);
    });

    childrenContainer.appendChild(childEntry);
  }
});
//RETRIVE DATA FROM THE FORM
//do not touch this part
  // Handle form submission
  const form = document.getElementById("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add children data to the form data
    data.children_info = JSON.stringify(children);
    
    try {
      const response = await fetch("http://localhost:3001/api/form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(result.message);
      console.log(result.data);
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Une erreur s'est produite lors de l'envoi du formulaire.");
    }
  });
});





// End of the script
//scripts carosell
//  document.addEventListener('DOMContentLoaded', function() {
//   const campCards = document.querySelector('.camp-cards');
//   const originalCards = Array.from(document.querySelectorAll('.camp-card'));
  
//   // Create scrollable container (scrollbar hidden)
//   const carouselWrapper = document.createElement('div');
//   Object.assign(carouselWrapper.style, {
//     display: 'flex',
//     gap: '24px',
//     width: '100%',
    
//     overflowX: 'auto',
//     scrollSnapType: 'x mandatory',
//     scrollBehavior: 'smooth',
//     // Hide scrollbar across all browsers
//     msOverflowStyle: 'none',
//     scrollbarWidth: 'none',
//     '::-webkit-scrollbar': { display: 'none' }
//   });
  
//   // Hide scrollbar for Webkit browsers
//   const style = document.createElement('style');
//   style.textContent = `
//     .camp-cards > div::-webkit-scrollbar {
//       display: none;
//     }
//   `;
//   document.head.appendChild(style);
  
//   // Add cards to container
//   originalCards.forEach(card => {
//     const cardWrapper = document.createElement('div');
//     cardWrapper.style.scrollSnapAlign = 'start';
//     cardWrapper.style.flexShrink = '0';
//     cardWrapper.appendChild(card);
//     carouselWrapper.appendChild(cardWrapper);
//   });
  
//   // Replace original content
//   campCards.innerHTML = '';
//   campCards.appendChild(carouselWrapper);
  
//   // Enable touch/swipe scrolling
//   let startX;
//   carouselWrapper.addEventListener('touchstart', (e) => {
//     startX = e.touches[0].clientX;
//   }, { passive: true });
  
//   carouselWrapper.addEventListener('touchmove', (e) => {
//     // Let native scroll handle it
//   }, { passive: true });
  
//   // Enable mouse wheel horizontal scrolling
//   carouselWrapper.addEventListener('wheel', (e) => {
//     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//       e.preventDefault();
//       carouselWrapper.scrollLeft += e.deltaY * 2;
//     }
//   }, { passive: true });
  
//   // Optional: Scale down on mobile
//   function scaleForMobile() {
//     const scale = window.innerWidth <= 768 ? 0.85  : 1;
//     originalCards.forEach(card => {
//       card.style.transform = `scale(${scale})`;
//       card.style.margin = scale < 1 ? '0 -20px' : '';
//     });
//   }
  
//   scaleForMobile();
//   window.addEventListener('resize', scaleForMobile);
// });
// scrypte ta3 lgallory 

  const filterButtons = document.querySelectorAll('.gallery-filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const seeMoreButton = document.querySelector('.see-more-btn');

  let currentFilter = 'all';
  let seeMoreVisible = false;

  function matchesFilter(item, filter) {
    return filter === 'all' || item.dataset.category === filter;
  }

  function updateGallery() {
    let filteredItems = Array.from(galleryItems).filter(item =>
      matchesFilter(item, currentFilter)
    );

    filteredItems.forEach((item, index) => {
      if (index < 2 || seeMoreVisible) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Hide all non-matching
    galleryItems.forEach(item => {
      if (!matchesFilter(item, currentFilter)) {
        item.style.display = 'none';
      }
    });

    // Button logic
    if (filteredItems.length > 2) {
      seeMoreButton.style.display = 'inline-block';
      seeMoreButton.textContent = seeMoreVisible ? 'Voir moins' : 'Voir plus';
    } else {
      seeMoreButton.style.display = 'none';
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      seeMoreVisible = false;
      updateGallery();
    });
  });

  seeMoreButton.addEventListener('click', () => {
    seeMoreVisible = !seeMoreVisible;
    updateGallery();
  });

  // Initial load
  updateGallery();