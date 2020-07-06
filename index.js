
document.addEventListener('DOMContentLoaded', () => {
    //console.log('hey cutie')
    fetchInfo("Tools and Tech");
});

function fetchInfo(group) {
    fetch("https://api.airtable.com/v0/appI40FwYNAUQHKq3/working%20groups?", {
        headers: {
            'Authorization': 'Bearer keyemv7utChwq4g5e'
        }
    })
        .then(res => res.json())
        .then(json => {

            let groupData = {};

            for (let i in json.records) {
                //console.log(json.records)
                if (json.records[i]['fields']['Working Group Name'] === group) {
                    let groupName = json.records[i]['fields']['Working Group Name'];
                    let driveFolder = json.records[i]['fields']['Drive Folder'];
                    let leads = json.records[i]['fields']['Lead(s)'];
                    let groupEmail = json.records[i]['fields']['Group Email'];
                    let groupDiscussion = json.records[i]['fields']['Group Discussion'];
                    let agendaDocument = json.records[i]['fields']['Agenda Document'];
                    let keyObjectives = json.records[i]['fields']['Objectives'];
                    //let newKey = keyObjectives.replace("/\s\d\g", "\n");
                    // console.log(newKey)
                    // console.log(keyObjectives)
                    groupData.name = groupName;
                    groupData.folder = driveFolder;
                    groupData.lead = leads;
                    groupData.email = groupEmail;
                    groupData.history = groupDiscussion;
                    groupData.agenda = agendaDocument;
                    groupData.objectives = keyObjectives;
                    //console.log(groupData.folder)
                }
            }
            var node1 = document.createElement("LI");
            var textnode1 = document.createTextNode(`${groupData.name} Working Group`);
            node1.appendChild(textnode1);
            document.getElementById("group").appendChild(node1);

            var node2 = document.createElement("LI");
            var textnode2 = document.createTextNode("Shared Working Group Folder: " + groupData.folder);
            node2.appendChild(textnode2);
            document.getElementById("list").appendChild(node2);

            var node3 = document.createElement("LI");
            var textnode3 = document.createTextNode("Lead: " + groupData.lead);
            node3.appendChild(textnode3);
            document.getElementById("list").appendChild(node3);

            var node4 = document.createElement("LI");
            var textnode4 = document.createTextNode("Working Group Email List: " + groupData.email);
            node4.appendChild(textnode4);
            document.getElementById("list").appendChild(node4);

            var node5 = document.createElement("LI");
            var textnode5 = document.createTextNode("Group Email History: " + groupData.history);
            node5.appendChild(textnode5);
            document.getElementById("list").appendChild(node5);

            var node6 = document.createElement("LI");
            var textnode6 = document.createTextNode("Living Agenda Document: " + groupData.agenda);
            node6.appendChild(textnode6);
            document.getElementById("list").appendChild(node6);

            var node7 = document.createElement("LI");
            var textnode7 = document.createTextNode("Key Objectives: " + groupData.objectives);
            node7.appendChild(textnode7);
            document.getElementById("list").appendChild(node7);
            console.log(groupData)

        });
};
