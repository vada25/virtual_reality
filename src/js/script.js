window.addEventListener('DOMContentLoaded', function() {
    
    //modal

  /*   const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose  = document.querySelector('[data-close]');
    
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);        
    });

    
    function closeModal() {
        modal.classList.toggle('show');               
        document.body.style.overflow = '';
    }; 

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        } 
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerID = setTimeout(openModal, 8000);
    
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //scroll Up

    const scrollUp = document.querySelector('.scrollup');
    
    function scrollToTop() {
        if (window.scrollY > 1000) {
            scrollUp.style.display = 'block';
        } else { 
            scrollUp.style.display = 'none';            
        }
    }   
        
    window.addEventListener('scroll', scrollToTop);
    
    scrollUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }); */

    //slider 
    const slider = document.querySelector('.slider'),
        slides = document.querySelectorAll('.slider__item'),
        prevBtn = document.querySelector('.slider__prev'),
        nextBtn = document.querySelector('.slider__next');
    let currentSlide = 0;

    function updateSliderPosition() {
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;  
    }
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.length - 1;
        }
        updateSliderPosition();
    });
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSliderPosition();
    });
    function checkScreenWidth() {
        if(window.innerWidth <= 768) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            slider.style.transform = 'translateX(0)';
            currentSlide = 0;
        }
    }
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
});