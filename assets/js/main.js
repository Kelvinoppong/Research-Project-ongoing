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

document.getElementById("save-button").addEventListener("click", function() {
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

