// This code should be in a separate JavaScript file, e.g., hackathon-listing.js

document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the container where hackathons will be displayed
    const hackathonListingContainer = document.getElementById('hackathon-listing');
    const searchInput = document.getElementById('search-hackathon');
    const filterSelect = document.getElementById('filter-status');
    
    // Initial load and set up real-time listener
    let unsubscribe;
    
    // Handle search input changes
    if (searchInput) {
      searchInput.addEventListener('input', updateHackathonListing);
    }
    
    // Handle filter changes
    if (filterSelect) {
      filterSelect.addEventListener('change', updateHackathonListing);
    }
    
    // Initial load
    updateHackathonListing();
    
    function updateHackathonListing() {
      // Clear previous listener if exists
      if (unsubscribe) {
        unsubscribe();
      }
      
      // Get current search term and filter values
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
      const statusFilter = filterSelect ? filterSelect.value : '';
      
      // Create a base query
      let hackathonsRef = db.collection('hackathons');
      
      // Apply server-side filters if possible
      if (statusFilter && statusFilter !== 'all') {
        hackathonsRef = hackathonsRef.where('status', '==', statusFilter);
      }
      
      // Order by date
      hackathonsRef = hackathonsRef.orderBy('startDate', 'desc');
      
      // Set up real-time listener
      unsubscribe = hackathonsRef.onSnapshot((snapshot) => {
        // Clear the container first
        if (hackathonListingContainer) {
          hackathonListingContainer.innerHTML = '';
        }
        
        // Check if there are any hackathons
        if (snapshot.empty) {
          if (hackathonListingContainer) {
            hackathonListingContainer.innerHTML = '<div class="no-hackathons">No hackathons found</div>';
          }
          return;
        }
        
        // Loop through each hackathon
        snapshot.forEach((doc) => {
          const hackathon = doc.data();
          hackathon.id = doc.id;
          
          // Apply client-side search filtering
          if (searchTerm && 
              !hackathon.title.toLowerCase().includes(searchTerm) && 
              !hackathon.description.toLowerCase().includes(searchTerm)) {
            return; // Skip this hackathon
          }
          
          // Create and add hackathon card to the listing
          if (hackathonListingContainer) {
            hackathonListingContainer.appendChild(createHackathonCard(hackathon));
          }
        });
        
        // If no hackathons match the filters after client-side filtering
        if (hackathonListingContainer && hackathonListingContainer.children.length === 0) {
          hackathonListingContainer.innerHTML = '<div class="no-hackathons">No hackathons found matching your criteria</div>';
        }
      }, (error) => {
        console.error("Error fetching hackathons:", error);
        if (hackathonListingContainer) {
          hackathonListingContainer.innerHTML = '<div class="error">Error loading hackathons. Please try again later.</div>';
        }
      });
    }
    
    function createHackathonCard(hackathon) {
      const card = document.createElement('div');
      card.className = 'hackathon-card';
      
      // Format dates
      const startDate = hackathon.startDate ? new Date(hackathon.startDate.toDate()).toLocaleDateString() : 'TBD';
      const endDate = hackathon.endDate ? new Date(hackathon.endDate.toDate()).toLocaleDateString() : 'TBD';
      
      card.innerHTML = `
        <h3>${hackathon.title}</h3>
        <p class="description">${hackathon.description}</p>
        <div class="hackathon-details">
          <span class="date">Start: ${startDate}</span>
          <span class="date">End: ${endDate}</span>
          <span class="status ${hackathon.status}">${hackathon.status}</span>
        </div>
        <button class="apply-btn" data-id="${hackathon.id}">Apply Now</button>
      `;
      
      // Add event listener to apply button
      const applyBtn = card.querySelector('.apply-btn');
      applyBtn.addEventListener('click', function() {
        handleHackathonApplication(hackathon.id);
      });
      
      return card;
    }
    
    function handleHackathonApplication(hackathonId) {
      // Check if user is signed in
      const user = auth.currentUser;
      if (!user) {
        alert('Please sign in to apply for hackathons');
        window.location.href = 'login.html';
        return;
      }
      
      // Get user data to verify they are a participant
      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          if (!doc.exists) {
            throw new Error('User profile not found');
          }
          
          const userData = doc.data();
          if (userData.role !== 'participant') {
            throw new Error('Only participants can apply to hackathons');
          }
          
          // Check if they've already applied
          return db.collection('applications')
            .where('hackathonId', '==', hackathonId)
            .where('userId', '==', user.uid)
            .get();
        })
        .then((snapshot) => {
          if (!snapshot.empty) {
            throw new Error('You have already applied to this hackathon');
          }
          
          // Redirect to application form or show modal
          window.location.href = `apply.html?hackathonId=${hackathonId}`;
          // Or show application modal:
          // showApplicationModal(hackathonId);
        })
        .catch((error) => {
          alert(error.message || 'Error applying to hackathon');
        });
    }
  });
  
  // Application modal function (optional)
  function showApplicationModal(hackathonId) {
    // Create and show application modal
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Apply for Hackathon</h2>
        <form id="application-form">
          <input type="hidden" id="hackathon-id" value="${hackathonId}">
          <div class="form-group">
            <label for="team-name">Team Name</label>
            <input type="text" id="team-name" required>
          </div>
          <div class="form-group">
            <label for="project-idea">Project Idea</label>
            <textarea id="project-idea" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Submit Application</button>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking the X
    modal.querySelector('.close-modal').addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    // Handle application submission
    modal.querySelector('#application-form').addEventListener('submit', function(e) {
      e.preventDefault();
      submitApplication(hackathonId);
    });
  }