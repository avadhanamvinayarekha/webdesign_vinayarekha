
document.addEventListener('DOMContentLoaded', function() {

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

 
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });

       
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }

    function performSearch(term) {
        const bookCards = document.querySelectorAll('.catalog-book-card');
        let foundCount = 0;

        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const author = card.querySelector('.author').textContent.toLowerCase();
            const description = card.querySelector('.description')?.textContent.toLowerCase() || '';
            
            const searchLower = term.toLowerCase();
            
            if (title.includes(searchLower) || author.includes(searchLower) || description.includes(searchLower)) {
                card.style.display = 'grid';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

     
        showSearchResults(foundCount, term);
    }

    function showSearchResults(count, term) {
     
        const existingMsg = document.querySelector('.search-results-message');
        if (existingMsg) existingMsg.remove();

        if (count === 0) {
            const catalogGrid = document.querySelector('.catalog-grid');
            const message = document.createElement('div');
            message.className = 'search-results-message';
            message.style.gridColumn = '1 / -1';
            message.style.textAlign = 'center';
            message.style.padding = '3rem';
            message.innerHTML = `
                <h3>No books found for "${term}"</h3>
                <p style="color: #64748b; margin-top: 1rem;">Try different keywords or clear your search.</p>
                <button class="btn-primary" style="margin-top: 1.5rem;" onclick="location.reload()">Clear Search</button>
            `;
            catalogGrid.appendChild(message);
        }
    }

 
    const applyFiltersBtn = document.querySelector('.filter-section .btn-primary');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    function applyFilters() {
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
        const priceRadio = document.querySelector('input[name="price"]:checked');
        const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');

        const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
        const selectedPrice = priceRadio?.value || 'all';
        const selectedAvailability = Array.from(availabilityCheckboxes).map(cb => cb.value);

        const bookCards = document.querySelectorAll('.catalog-book-card');
        let visibleCount = 0;

        bookCards.forEach(card => {
            let showCard = true;

       
            if (selectedPrice !== 'all') {
                const buyBtn = card.querySelector('.btn-primary');
                const priceText = buyBtn?.textContent || '';
                const priceMatch = priceText.match(/\$(\d+\.\d+)/);
                
                if (priceMatch) {
                    const price = parseFloat(priceMatch[1]);
                    
                    if (selectedPrice === 'under5' && price >= 5) showCard = false;
                    if (selectedPrice === '5to10' && (price < 5 || price > 10)) showCard = false;
                    if (selectedPrice === 'over10' && price <= 10) showCard = false;
                }
            }

            if (showCard) {
                card.style.display = 'grid';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

      
        showFilterResults(visibleCount);
    }

    function showFilterResults(count) {
        const existingMsg = document.querySelector('.filter-results-message');
        if (existingMsg) existingMsg.remove();

        const catalogControls = document.querySelector('.catalog-controls');
        const message = document.createElement('div');
        message.className = 'filter-results-message';
        message.style.width = '100%';
        message.style.padding = '1rem';
        message.style.background = '#f1f5f9';
        message.style.borderRadius = '0.5rem';
        message.style.textAlign = 'center';
        message.style.marginTop = '1rem';
        message.textContent = `Showing ${count} book${count !== 1 ? 's' : ''}`;
        
        catalogControls.after(message);

      
        setTimeout(() => message.remove(), 3000);
    }

    const sortDropdown = document.querySelector('.sort-dropdown');
    
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            const sortBy = this.value;
            sortBooks(sortBy);
        });
    }

    function sortBooks(criteria) {
        const catalogGrid = document.querySelector('.catalog-grid');
        const bookCards = Array.from(document.querySelectorAll('.catalog-book-card'));

        bookCards.sort((a, b) => {
            if (criteria.includes('Price (Low to High)')) {
                return getBookPrice(a) - getBookPrice(b);
            } else if (criteria.includes('Price (High to Low)')) {
                return getBookPrice(b) - getBookPrice(a);
            } else if (criteria.includes('Title')) {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                return titleA.localeCompare(titleB);
            } else if (criteria.includes('Rating')) {
                return getBookRating(b) - getBookRating(a);
            }
            return 0;
        });

   
        bookCards.forEach(card => catalogGrid.appendChild(card));
    }

    function getBookPrice(card) {
        const buyBtn = card.querySelector('.btn-primary');
        const priceText = buyBtn?.textContent || '$0';
        const priceMatch = priceText.match(/\$(\d+\.\d+)/);
        return priceMatch ? parseFloat(priceMatch[1]) : 0;
    }

    function getBookRating(card) {
        const ratingText = card.querySelector('.rating')?.textContent || '0';
        const ratingMatch = ratingText.match(/\((\d+\.?\d*)\)/);
        return ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    }


    const rentButtons = document.querySelectorAll('.btn-secondary');
    const buyButtons = document.querySelectorAll('.btn-primary');

    rentButtons.forEach(btn => {
        if (btn.textContent.includes('Rent')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookCard = this.closest('.catalog-book-card') || this.closest('.book-item');
                const bookTitle = bookCard.querySelector('h3')?.textContent || 'this book';
                const priceMatch = this.textContent.match(/\$(\d+\.\d+)/);
                const price = priceMatch ? priceMatch[1] : '0.00';
             
                this.textContent = 'Adding...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = `Rent ${price}`;
                    this.disabled = false;
                    showNotification(`📚 "${bookTitle}" added to rental cart!`, 'success');
                }, 500);
            });
        }
    });

    buyButtons.forEach(btn => {
        if (btn.textContent.includes('Buy')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookCard = this.closest('.catalog-book-card') || this.closest('.book-item');
                const bookTitle = bookCard.querySelector('h3')?.textContent || 'this book';
                const priceMatch = this.textContent.match(/\$(\d+\.\d+)/);
                const price = priceMatch ? priceMatch[1] : '0.00';
                
            
                this.textContent = 'Adding...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = `Buy ${price}`;
                    this.disabled = false;
                    showNotification(`🎉 "${bookTitle}" purchased successfully!`, 'success');
                }, 500);
            });
        }
    });


    function showNotification(message, type = 'info') {
      
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

    
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
      
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#6366f1',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            animation: 'slideInRight 0.3s ease-out',
            maxWidth: '400px',
            fontSize: '0.95rem',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

       
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

  
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);


    const bookItems = document.querySelectorAll('.book-item, .catalog-book-card');
    
    bookItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
   
        const bookCover = item.querySelector('.book-cover, .book-cover-large');
        if (bookCover) {
            bookCover.style.cursor = 'pointer';
            bookCover.addEventListener('click', function() {
                const title = item.querySelector('h3')?.textContent || 'Book';
                const author = item.querySelector('.book-author, .author')?.textContent || 'Unknown Author';
                const description = item.querySelector('.description')?.textContent || 'No description available.';
                const rating = item.querySelector('.rating')?.textContent || 'No rating';
                
                showQuickView(title, author, description, rating);
            });
        }
    });
    
    function showQuickView(title, author, description, rating) {
      
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="quick-view-content">
                <button class="close-modal">&times;</button>
                <h2 style="margin-bottom: 0.5rem;">${title}</h2>
                <p style="color: #64748b; margin-bottom: 1rem;">${author}</p>
                <div style="margin-bottom: 1rem;">${rating}</div>
                <p style="line-height: 1.8; color: #475569;">${description}</p>
                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button class="btn-secondary" style="flex: 1;">Rent Now</button>
                    <button class="btn-primary" style="flex: 1;">Buy Now</button>
                </div>
            </div>
        `;
        
      
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10000',
            animation: 'fadeIn 0.3s ease-out'
        });
        
        const content = modal.querySelector('.quick-view-content');
        Object.assign(content.style, {
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            animation: 'slideUp 0.3s ease-out'
        });
        
        const closeBtn = modal.querySelector('.close-modal');
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            color: '#64748b',
            lineHeight: '1',
            padding: '0',
            width: '2rem',
            height: '2rem'
        });
        
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        document.body.appendChild(modal);
    }
    

    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .close-modal:hover {
            color: #ef4444 !important;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(modalStyle);

  
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
           
            pageButtons.forEach(b => b.classList.remove('active'));
            
            
            if (!this.textContent.includes('Previous') && !this.textContent.includes('Next')) {
                this.classList.add('active');
            }
            
          
            const catalogSection = document.querySelector('.catalog-section');
            if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            showNotification(`Loading page ${this.textContent}...`, 'info');
        });
    });


    function addClearFiltersButton() {
        const filterSection = document.querySelector('.filter-section');
        if (filterSection) {
            const clearBtn = document.createElement('button');
            clearBtn.textContent = 'Clear All Filters';
            clearBtn.className = 'btn-secondary btn-full-width';
            clearBtn.style.marginTop = '1rem';
            
            clearBtn.addEventListener('click', function() {
            
                document.querySelectorAll('.filter-section input[type="checkbox"]').forEach(cb => {
                    cb.checked = false;
                });
                
              
                const allPriceRadio = document.querySelector('input[name="price"][value="all"]');
                if (allPriceRadio) allPriceRadio.checked = true;
                
               
                document.querySelectorAll('.catalog-book-card').forEach(card => {
                    card.style.display = 'grid';
                });
                
               
                if (searchInput) searchInput.value = '';
                
                showNotification('Filters cleared!', 'info');
            });
            
            const applyBtn = filterSection.querySelector('.btn-primary');
            if (applyBtn) {
                applyBtn.after(clearBtn);
            }
        }
    }

    addClearFiltersButton();

    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('📚 BookVerse JavaScript loaded successfully!');
    

    let cartCount = 0;
    
    function updateCartDisplay() {
        const signInButtons = document.querySelectorAll('.nav-links .btn-primary');
        signInButtons.forEach(btn => {
            if (btn.textContent.trim() === 'Sign In' && cartCount > 0) {
                btn.textContent = `Cart (${cartCount})`;
                btn.style.position = 'relative';
            } else if (cartCount === 0 && btn.textContent.includes('Cart')) {
                btn.textContent = 'Sign In';
            }
        });
    }
    

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') && e.target.textContent.includes('Buy')) {
            cartCount++;
            updateCartDisplay();
        }
        if (e.target.classList.contains('btn-secondary') && e.target.textContent.includes('Rent')) {
            cartCount++;
            updateCartDisplay();
        }
    });
});