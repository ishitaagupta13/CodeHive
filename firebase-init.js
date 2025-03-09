// Import Firebase modules
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

// Get Firestore instance
const db = getFirestore();

/**
 * Save user profile data to Firestore based on role
 * @param {string} userId - The user's UID
 * @param {string} role - User role (participant, judge, organizer)
 * @param {object} profileData - Profile information to save
 */
async function saveProfileData(userId, role, profileData) {
  try {
    // Create base user reference
    const userDocRef = doc(db, "users", userId);
    
    // Create role-specific profile reference
    const profileDocRef = doc(db, `${role}Profiles`, userId);
    
    // Add timestamp to profile data
    const dataWithTimestamp = {
      ...profileData,
      updatedAt: new Date(),
    };
    
    // Check if profile document already exists
    const profileDoc = await getDoc(profileDocRef);
    
    if (profileDoc.exists()) {
      // Update existing profile
      await updateDoc(profileDocRef, dataWithTimestamp);
      console.log(`${role} profile updated successfully`);
    } else {
      // Create new profile with creation timestamp
      await setDoc(profileDocRef, {
        ...dataWithTimestamp,
        createdAt: new Date(),
        userId: userId,
        role: role
      });
      
      // Update user document to indicate profile completion
      await updateDoc(userDocRef, {
        profileCompleted: true,
        profileCompletedAt: new Date()
      });
      
      console.log(`${role} profile created successfully`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error saving profile data:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Handle profile setup form submission
 * @param {Event} event - Form submission event
 * @param {string} role - User role
 */
async function handleProfileSetup(event, role) {
  event.preventDefault();
  
  // Get current user
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to complete your profile");
    return;
  }
  
  // Get form data based on role
  let profileData;
  
  if (role === "participant") {
    profileData = {
      fullName: document.getElementById('setup-fullName').value,
      email: document.getElementById('setup-email').value,
      jobTitle: document.getElementById('setup-jobTitle').value || "",
      location: document.getElementById('setup-location').value || "",
      team: document.getElementById('setup-team').value || "",
      skills: document.getElementById('setup-skills').value || "",
      experience: document.getElementById('setup-experience').value || "",
      previousCompetitions: document.getElementById('setup-competitions').value || "",
      bio: document.getElementById('setup-bio').value || "",
      submissionCount: 0,
      averageScore: 0
    };
  } else if (role === "judge") {
    profileData = {
      fullName: document.getElementById('setup-fullName').value,
      email: document.getElementById('setup-email').value,
      jobTitle: document.getElementById('setup-jobTitle').value || "",
      organization: document.getElementById('setup-organization').value || "",
      expertise: document.getElementById('setup-expertise').value || "",
      experience: document.getElementById('setup-experience').value || "",
      previousJudging: document.getElementById('setup-previous-judging').value || "",
      bio: document.getElementById('setup-bio').value || "",
      assignedTeams: [],
      reviewsCompleted: 0
    };
  } else if (role === "organizer") {
    profileData = {
      fullName: document.getElementById('setup-fullName').value,
      email: document.getElementById('setup-email').value,
      jobTitle: document.getElementById('setup-jobTitle').value || "",
      organization: document.getElementById('setup-organization').value || "",
      role: document.getElementById('setup-org-role').value || "",
      bio: document.getElementById('setup-bio').value || ""
    };
  }
  
  // Save profile data
  const result = await saveProfileData(user.uid, role, profileData);
  
  if (result.success) {
    // Hide setup form
    document.getElementById('profile-setup').style.display = 'none';
    
    // Populate and show profile view
    populateProfileFromSetup(profileData);
    document.getElementById('profile-view').style.display = 'block';
    
    // Show success message
    showMessage('Profile created successfully!', 'success');
    
    // Set profile as created in local storage (for demo purposes)
    localStorage.setItem('profileCreated', 'true');
  } else {
    showMessage(`Error: ${result.error}`, 'error');
  }
}

/**
 * Handle profile edit form submission
 * @param {Event} event - Form submission event
 * @param {string} role - User role
 */
async function handleProfileEdit(event, role) {
  event.preventDefault();
  
  // Get current user
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to update your profile");
    return;
  }
  
  // Get form data based on form fields present
  const profileData = {};
  
  // Common fields
  const formFields = [
    'fullName', 'email', 'jobTitle', 'location', 'team',
    'skills', 'experience', 'bio'
  ];
  
  // Add values from form fields that exist
  formFields.forEach(field => {
    const element = document.getElementById(field);
    if (element) {
      profileData[field] = element.value;
    }
  });
  
  // Role-specific fields
  if (role === "participant") {
    const competitions = document.getElementById('competitions');
    if (competitions) profileData.previousCompetitions = competitions.value;
  } else if (role === "judge") {
    const expertise = document.getElementById('expertise');
    if (expertise) profileData.expertise = expertise.value;
    
    const previousJudging = document.getElementById('previous-judging');
    if (previousJudging) profileData.previousJudging = previousJudging.value;
  }
  
  // Save profile data
  const result = await saveProfileData(user.uid, role, profileData);
  
  if (result.success) {
    // Switch back to view mode
    document.getElementById('profile-edit').style.display = 'none';
    document.getElementById('profile-view').style.display = 'block';
    
    // Update profile view with new values
    updateProfileFromForm(profileData);
    
    // Show success message
    showMessage('Profile updated successfully!', 'success');
  } else {
    showMessage(`Error: ${result.error}`, 'error');
  }
}

/**
 * Load profile data from Firestore based on user ID and role
 * @param {string} userId - The user's UID 
 * @param {string} role - User role
 */
async function loadProfileData(userId, role) {
  try {
    // Reference to role-specific profile document
    const profileDocRef = doc(db, `${role}Profiles`, userId);
    
    // Get profile document
    const profileDoc = await getDoc(profileDocRef);
    
    if (profileDoc.exists()) {
      const profileData = profileDoc.data();
      
      // Populate profile view
      populateProfile(profileData);
      
      // Show profile view
      document.getElementById('profile-view').style.display = 'block';
      document.getElementById('profile-setup').style.display = 'none';
      
      // Set localStorage for demo purposes
      localStorage.setItem('profileCreated', 'true');
      
      return { success: true, data: profileData };
    } else {
      // No profile exists, show profile setup
      document.getElementById('profile-view').style.display = 'none';
      document.getElementById('profile-setup').style.display = 'block';
      
      // Remove localStorage flag for demo purposes
      localStorage.removeItem('profileCreated');
      
      return { success: false, reason: 'profile-not-found' };
    }
  } catch (error) {
    console.error("Error loading profile data:", error);
    return { success: false, error: error.message };
  }
}

// Event listeners for profile forms
document.addEventListener('DOMContentLoaded', () => {
  // Get current user and role
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        // Get user document to determine role
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role || 'participant'; // Default to participant
          
          // Load profile based on role
          loadProfileData(user.uid, role);
          
          // Set up event listeners for the appropriate form based on role
          const profileSetupForm = document.getElementById('profile-setup-form');
          if (profileSetupForm) {
            profileSetupForm.addEventListener('submit', (e) => handleProfileSetup(e, role));
          }
          
          const profileEditForm = document.getElementById('profile-edit-form');
          if (profileEditForm) {
            profileEditForm.addEventListener('submit', (e) => handleProfileEdit(e, role));
          }
        }
      } catch (error) {
        console.error("Error getting user role:", error);
      }
    } else {
      // Redirect to login if not authenticated
      window.location.href = 'login.html';
    }
  });
});

// Export functions for use in other modules
export { saveProfileData, loadProfileData };