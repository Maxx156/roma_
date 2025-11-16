// Sample courses data
const coursesData = [
    {
        id: 1,
        title: 'Веб-разработка с нуля',
        category: 'programming',
        level: 'beginner',
        format: 'video',
        price: 9990,
        oldPrice: 15990,
        rating: 4.9,
        students: 8500,
        duration: '120 часов',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        badge: 'Акция'
    },
    {
        id: 2,
        title: 'UI/UX дизайн для начинающих',
        category: 'design',
        level: 'beginner',
        format: 'video',
        price: 12990,
        rating: 4.8,
        students: 6200,
        duration: '80 часов',
        image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        id: 3,
        title: 'SMM и контент-маркетинг',
        category: 'marketing',
        level: 'intermediate',
        format: 'video',
        price: 8990,
        rating: 4.7,
        students: 4500,
        duration: '60 часов',
        image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        id: 4,
        title: 'Python для начинающих',
        category: 'programming',
        level: 'beginner',
        format: 'video',
        price: 11990,
        rating: 4.9,
        students: 7200,
        duration: '100 часов',
        image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        id: 5,
        title: 'Графический дизайн в Adobe',
        category: 'design',
        level: 'intermediate',
        format: 'video',
        price: 14990,
        rating: 4.8,
        students: 3800,
        duration: '90 часов',
        image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        id: 6,
        title: 'Digital-маркетинг',
        category: 'marketing',
        level: 'advanced',
        format: 'video',
        price: 16990,
        rating: 4.9,
        students: 2900,
        duration: '110 часов',
        image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
        id: 7,
        title: 'JavaScript продвинутый',
        category: 'programming',
        level: 'advanced',
        format: 'video',
        price: 13990,
        rating: 4.8,
        students: 5100,
        duration: '95 часов',
        image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
        id: 8,
        title: 'Личностный рост и мотивация',
        category: 'personal',
        level: 'beginner',
        format: 'text',
        price: 5990,
        rating: 4.6,
        students: 12000,
        duration: '40 часов',
        image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    }
];

let filteredCourses = [...coursesData];

// Render courses
function renderCourses(courses) {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (courses.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-gray);">Курсы не найдены</div>';
        return;
    }
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            ${course.badge ? `<div class="course-badge">${course.badge}</div>` : ''}
            <div class="course-image" style="background: ${course.image};"></div>
            <div class="course-content">
                <div class="course-category">${getCategoryName(course.category)}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">Полный курс по созданию современных веб-приложений и приложений.</p>
                <div class="course-meta">
                    <span class="course-duration">⏱ ${course.duration}</span>
                    <span class="course-rating">⭐ ${course.rating} (${formatNumber(course.students)})</span>
                </div>
                <div class="course-footer">
                    <div class="course-price">
                        ${course.oldPrice ? `<span class="price-old">${formatPrice(course.oldPrice)}</span>` : ''}
                        <span class="price-current">${formatPrice(course.price)}</span>
                    </div>
                    <a href="course.html" class="btn btn-primary btn-small">Подробнее</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = courses.length;
    }
}

// Helper functions
function getCategoryName(category) {
    const categories = {
        'programming': 'Программирование',
        'design': 'Дизайн',
        'marketing': 'Маркетинг',
        'business': 'Бизнес',
        'personal': 'Личностный рост'
    };
    return categories[category] || category;
}

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Filter courses
function filterCourses() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(cb => cb.value);
    const selectedFormats = Array.from(document.querySelectorAll('input[name="format"]:checked')).map(cb => cb.value);
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || 50000);
    
    filteredCourses = coursesData.filter(course => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) return false;
        if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) return false;
        if (selectedFormats.length > 0 && !selectedFormats.includes(course.format)) return false;
        if (course.price > maxPrice) return false;
        return true;
    });
    
    sortCourses();
    renderCourses(filteredCourses);
}

// Sort courses
function sortCourses() {
    const sortValue = document.getElementById('sortSelect')?.value || 'popular';
    
    switch(sortValue) {
        case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredCourses.sort((a, b) => b.id - a.id);
            break;
        default: // popular
            filteredCourses.sort((a, b) => b.students - a.students);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    renderCourses(coursesData);
    
    // Filter listeners
    document.querySelectorAll('input[name="category"], input[name="level"], input[name="format"]').forEach(input => {
        input.addEventListener('change', filterCourses);
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const maxPriceEl = document.getElementById('maxPrice');
            if (maxPriceEl) {
                maxPriceEl.textContent = formatPrice(parseInt(this.value));
            }
            filterCourses();
        });
    }
    
    // Sort listener
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortCourses();
            renderCourses(filteredCourses);
        });
    }
    
    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            if (priceRange) {
                priceRange.value = 50000;
                const maxPriceEl = document.getElementById('maxPrice');
                if (maxPriceEl) {
                    maxPriceEl.textContent = formatPrice(50000);
                }
            }
            filteredCourses = [...coursesData];
            sortCourses();
            renderCourses(filteredCourses);
        });
    }
});

