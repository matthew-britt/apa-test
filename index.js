

document.addEventListener('DOMContentLoaded', () => {
    //console.log('hey cutie')
    let params = new URLSearchParams(location.search);
    let newParams = params.toString().replace('=', '').replace(/\+/g, ' ')
    //console.log(params);
    //console.log(newParams);
    fetchInfo(newParams);

    //fetchLead();
});

function fetchLead(leadName) {
    fetch("https://api.airtable.com/v0/appI40FwYNAUQHKq3/Contacts?", {
        headers: {
            'Authorization': 'Bearer keyemv7utChwq4g5e'
        }
    })
    .then(res => res.json())
    .then(json => {
        for (let i in json.records) {
             if (json.records[i]['id'] === leadName) {
                let name = json.records[i]['fields']['Name'];
                let leadEmail = json.records[i]['fields']['Email'];

                let aLead = document.createElement('a');
                let linkTextGroup = document.createTextNode(name);
                aLead.appendChild(linkTextGroup);
                aLead.innerText = `\u00A0\u00A0${name}\u00A0\u00A0`;
                aLead.href = `mailto:${leadEmail}`;
                aLead.title = "Click Here";
                aLead.target = "_blank";
                document.getElementById("lead").appendChild(aLead); 
            }           
        }
    })
};

function leadArray(arr) {
    if (arr === undefined) return 'none';
    for (let i = 0; i < arr.length; i++) {
        fetchLead(arr[i]);
    }
};

function fetchInfo(group) {
    fetch("https://api.airtable.com/v0/appI40FwYNAUQHKq3/tblJKfpNa4pA68rOV?", {
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
                   //console.log(leads)
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
                    //console.log(groupData.history)
                }
            }
            let leads = groupData.lead
            leadArray(leads);
            //fetchLead(groupData.lead);
            //console.log(leads)

            let node1 = document.createElement("LI");
            let textnode1 = document.createTextNode(`${groupData.name} Working Group`);
            node1.appendChild(textnode1);
            document.getElementById("group").appendChild(node1);


            let aGroup = document.createElement('a');
            let linkTextGroup = document.createTextNode(groupData.folder);
            aGroup.appendChild(linkTextGroup);
            aGroup.title = "Click Here";
            if (groupData.folder.includes('https://')) {
                aGroup.href = `${groupData.folder}`;
            } else {
                aGroup.href = `https://${groupData.folder}`
            };
            aGroup.target = "_blank";
            aGroup.innerText = "Click here"
            document.getElementById("groupName").appendChild(aGroup);


            let aEmail = document.createElement('a');
            let linkTextEmail = document.createTextNode(groupData.email);
            aEmail.appendChild(linkTextEmail);
            aEmail.title = "Click Here";
            aEmail.href = `mailto:${groupData.email}`;
            document.getElementById("email").appendChild(aEmail)

            let aHistory = document.createElement('a');
            let linkTextHistory = document.createTextNode(groupData.history);
            aHistory.appendChild(linkTextHistory);
            aHistory.title = "Click Here";
            if (groupData.history.includes('https://')) {
                aHistory.href = `${groupData.history}`;
            } else {
                aHistory.href = `https://${groupData.history}`;
            };
            aHistory.target = "_blank";
            aHistory.innerText = "Click here"
            document.getElementById("history").appendChild(aHistory);


            let aAgenda = document.createElement('a');
            let linkTextAgenda = document.createTextNode(groupData.agenda);
            aAgenda.appendChild(linkTextAgenda);
            aAgenda.title = "Click Here";
            if (groupData.agenda.includes('https://')) {
                aAgenda.href = `${groupData.agenda}`
            } else {
                aAgenda.href = `https://${groupData.agenda}`;
            };
            aAgenda.target = "_blank";
            aAgenda.innerText = "Click here"
            document.getElementById("agenda").appendChild(aAgenda);
          

            document.getElementById("keys").innerText = groupData.objectives;

            //document.getElementById("groupName").innerText = groupData.name;
            //document.getElementById("lead").innerText = groupData.lead;
            //document.getElementById("email").innerText = groupData.email;
            //document.getElementById("history").innerText = groupData.history;
            //document.getElementById("agenda").innerText = groupData.agenda;
console.log(keys)



            


        });
};
