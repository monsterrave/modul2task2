console.log(data.results[0].members);

// getting values from the JSON
var members = data.results[0].members;
// creating loop    
for (var i = 0; i < members.length; i++) { //either middle name or none if no middlename

    var currentMember = data.results[0].members[i];
    var name = currentMember.first_name + " " + (currentMember.middle_name || "") + " " + currentMember.last_name
    var entry = '<tr class="' + currentMember.party + '"><td><a href="' + currentMember.url + '" target="_blank">' + name + '</a></td>';
    entry += '<td>' + currentMember.party + '</td>'; //adding to string 
    entry += '<td>' + currentMember.state + '</td>'; //
    entry += '<td>' + currentMember.seniority + '</td>'; //
    entry += '<td>' + currentMember.votes_with_party_pct + " %" + '</td></tr>';

    document.getElementById("senate-data").innerHTML += entry;
}



for (var i = 0; i < members.length; i++) {
    var state = members[i].state;
    var liElement = '<option>' + state + '</option>';
    document.querySelector("#statelist").innerHTML += liElement;
}


$("input.partyFilter").change(function() {

    console.log("clicked");
            var isChecked = $(this).is(":checked");      /// durch einsetzen der variablen auch einzeiliger code möglich
            var party = $(this).val(); // "r" "d" or i
            $('tr.' +party).toggle( isChecked );
        });




  /* das war mein lächerlicher Versuch ;) 
  //LOOPING through new array and add matching people to the resulting filtered table
        var $tableBody = $('<tbody></tbody>'); // new html content with jquery
        for (var i = 0; i < membersR.length; i++) { //loop through matches
            var republicanDbag = membersR[i]; //storing in variable
            var $row = $('<tr></tr>'); //creating row for it (variable)
            $row.append($('<td></td>').text(republicanDbag)); // add republican
            $tableBody.append($row); //add row to new tablebody content
        }
*/