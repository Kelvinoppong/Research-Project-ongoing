// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChGM_q3QAsdQ_UBmn_xpp7RlnU1hDx0pI",
  authDomain: "research-project-ff3c4.web.app",
  projectId: "research-project-ff3c4",
  storageBucket: "research-project-ff3c4.firebasestorage.app",
  messagingSenderId: "685338989067",
  appId: "1:685338989067:web:e626fa38097fe554cf6d0e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Check authentication state
auth.onAuthStateChanged(user => {
  if (!user && !window.location.pathname.includes('index.html')) {
    // If not authenticated and not on login page, redirect to login
    window.location.href = 'index.html';
    return;
  }
  
  if (user) {
    // User is signed in
    const whenSignedIn = document.getElementById('when-signed-in');
    const whenSignedOut = document.getElementById('when-signed-out');
    
    if (whenSignedIn && whenSignedOut) {
      whenSignedIn.hidden = false;
      whenSignedOut.hidden = true;
    }
  } else {
    // User is signed out
    const whenSignedIn = document.getElementById('when-signed-in');
    const whenSignedOut = document.getElementById('when-signed-out');
    
    if (whenSignedIn && whenSignedOut) {
      whenSignedIn.hidden = true;
      whenSignedOut.hidden = false;
    }
  }
});

// Auth elements
const signInBtn = document.getElementById('sign-in');
const signOutBtn = document.getElementById('sign-out');

// Sign in event handlers with error handling
signInBtn?.addEventListener('click', async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    await auth.signInWithPopup(provider);
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Sign-in error:', error);
    if (error.code === 'auth/popup-blocked') {
      alert('Please enable popups for this site to use Google Sign-In');
    } else if (error.code === 'auth/unauthorized-domain') {
      alert('This domain is not authorized. Please make sure to add localhost and 127.0.0.1 to the authorized domains in your Firebase console under Authentication > Settings.');
    } else if (error.code === 'auth/third-party-cookies-blocked') {
      alert('Please enable third-party cookies to use Google Sign-In, or try signing in with email/password');
    } else {
      alert(`Authentication error: ${error.message}`);
    }
  }
});

// Sign out handler
signOutBtn?.addEventListener('click', async () => {
  try {
    await auth.signOut();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Sign-out error:', error);
  }
});

// Team members drag and drop functionality
const teamMembers = document.getElementById("team-members");

new Sortable(teamMembers, {
  group: 'shared',
  animation: 150,
  chosenClass: "team-member-chosen",
  dragClass: "team-member-drag",
});

const myTeam = document.getElementById("my-team");

new Sortable(myTeam, {
  group: 'shared',
  animation: 150,
  chosenClass: "team-member-chosen",
  dragClass: "team-member-drag",
});

document.getElementById("save-button")?.addEventListener("click", function() {
  const present1 = [];
  const allMembers = document.querySelectorAll("#team-members .team-member-name, #my-team .team-member-name");
  const myTeamMembers = document.querySelectorAll("#my-team .team-member-name");

  let includeAll = false;
  myTeamMembers.forEach(member => {
    if (member.id === "all") {
      includeAll = true;
    }
  });

  if (includeAll) {
    allMembers.forEach(member => {
      present1.push(member.getAttribute("name"));
    });
  } else {
    myTeamMembers.forEach(member => {
      present1.push(member.getAttribute("name"));
    });
  }

  const existingDropdown = document.querySelector(".groups select");
  if (existingDropdown) {
    existingDropdown.remove();
  }

  const dropdown = document.createElement("select");
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Team Members Present";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  present1.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  });

  document.querySelector(".groups").appendChild(dropdown);

  // Reset team members to their original position
  const teamMembersContainer = document.getElementById("team-members");
  const myTeamContainer = document.getElementById("my-team");
  while (myTeamContainer.firstChild) {
    teamMembersContainer.appendChild(myTeamContainer.firstChild);
  }
});
