// Discount timer
document.addEventListener('DOMContentLoaded', function() {
    const timer = document.getElementById('discountTimer');
    if (!timer) return;
    
    // Set end time (2 hours from now)
    const endTime = new Date().getTime() + (2 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            timer.innerHTML = '<span>00</span>:<span>00</span>:<span>00</span>';
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const hoursSpan = timer.querySelector('span:nth-child(1)');
        const minutesSpan = timer.querySelector('span:nth-child(3)');
        const secondsSpan = timer.querySelector('span:nth-child(5)');
        
        if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
        if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
});

// Module accordion
document.addEventListener('DOMContentLoaded', function() {
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const module = this.closest('.program-module');
            const content = module.querySelector('.module-content');
            
            // Toggle active class
            module.classList.toggle('active');
            
            // Toggle content visibility
            if (module.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
});

// Video placeholder click
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real application, this would open a video modal or navigate to video page
            alert('Промо-видео будет открыто здесь');
        });
    }
});

