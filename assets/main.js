/*$(function() {
var data;

    $.getJSON( "assets/NYT-congress-113-senate.json", function( data ) {
        var members = [];

        $.each( data, function( first_name,middle_name,last_name,party,state,seniority,votes_with_party_pct, value ) {
        items.push( "<tr>"+"<td>" + first_name + middle_name + last_name + "</td>" + "<td>" + party + "</td>" + "<td>" + state + "</td>" + "<td>" + seniority + "</td>" + "<td>" + votes_with_party_pct + "</td>" + "</tr>");
    });

});*/

    console.log(data.results[0].members);

    // getting values from the JSON
    var members = data.results[0].members;

    $("#polititians").html(entry);
          if ( $("#polititians").length) {
            $("#polititians").show(entry)
          }

    // creating loop    
    for (var i = 0; i < members.length; i++) { //either middle name or none if no middlename

        var currentMember = data.results[0].members[i];
        var name = currentMember.first_name + " " + (currentMember.middle_name || "") + " " + currentMember.last_name
        var entry = '<tr class="' + currentMember.party + '"><td><a href="' + currentMember.url + '" target="_blank">' + name + '</a></td>';
        entry += '<td>' + currentMember.party + '</td>'; //adding to string 
        entry += '<td>' + currentMember.state + '</td>'; //
        entry += '<td>' + currentMember.seniority + '</td>'; //
        entry += '<td>' + currentMember.votes_with_party_pct + " %" + '</td></tr>';

         

    }

    $("input.partyFilter").change(function() {
        /* der Selektor input.partyFilter wählt meine Input elemente aus, 
                                                     nämlich die checkboxen der Klasse partyFilter, durch das event *change* (check/unchecking checkbox)
                                                     wird die funktion "gecallt"
                                                     */
        console.log("clicked"); // Testen, ob clicker funktioniert
        var isChecked = $(this).is(":checked");
        var party = $(this).val(); // "R" "D" or "I"            //var party beschreibt, welche Values die inputs.partyFilter annehmen können
        $('tr.' + party).toggle(isChecked);
        /* jquery für erstellung eines neuen tr elements mit dem Value  des inputs.partyfilter,
                                                            der getogglet wurde (.toggle( isChecked ))
                                                        */
    });
    /// !!!!!!durch einsetzen der variablen auch 1-zeiliger code möglich
    /*Jetzt verstehe ich nur nicht ganz, warum ich dieses Loopding was ich hier drunter als Comment geschrieben habe:
                        Muss ich nicht mit jquery ein neues table element dann "bauen" während durch alle Senators geloopt wird, um festzustellen, welche party
                        und je nachdem wird das passende in neue rows "geschrieben"... heißt das, dass ich durch $('tr.'+party).toggle( isChecked ) in dem Code drüber
                        automatisch die row inhalte überschreibe?


       das war mein lächerlicher Versuch ;) 
      //LOOPING through new array and add matching people to the resulting filtered table
            var $tableBody = $('<tbody></tbody>'); // new html content with jquery
            for (var i = 0; i < membersR.length; i++) { //loop through matches
                var republicanDbag = membersR[i]; //storing in variable
                var $row = $('<tr></tr>'); //creating row for it (variable)
                $row.append($('<td></td>').text(republicanDbag)); // add republican
                $tableBody.append($row); //add row to new tablebody content
            }

    //PARTYFILTER müsste ja eigentlich auch für die Houseseite funktionieren. leider nicht... 
                    Kriege eine Fehlermeldung für Zeile 16, aber da gehts ja um senate-data nicht um die house-data??? 


    */
    var statesArr = [];

    for (var i = 0; i < members.length; i++) {
        var currentState = members[i].state;
        console.log(currentState);
        if (statesArr.indexOf(currentState) == -1) {
            statesArr.push(currentState);
        }
    }

    statesArr.sort();

    statesArr.forEach(function(value) {
        var option = '<option>' + value + '</option>';
        $('#statelist').append(option);
    });


    //STATEFILTER
    /*
    bei Click auf ein options element (state) in der dropdown liste -> function called

      dann legen wir eine variable fest für var state und holt sich den Value /* 50 Möglichkeiten */
    /*  also: var state = $("select#statelist").val()
      dann eine variable für das was geclickt wird var isClicked = $(this).is(":checked")
      und nun erstellt man die zeile mit inhalt $('tr.' +state).toggle( isClicked );   // dann wollen wir mal sehen

      */


    //$("option.stateFilter").change(function() {                



    //          console.log("clicked");                                 // Testen, ob clicker funktioniert
    //        var isClicked = $(this).is(":clicked");      
    //      var state = $(this).val(); // 50 Möglichekeiten            //var state beschreibt, welche Values die select.stateFilter annehmen können
    //    $('tr.' + state ).toggle( isClicked );                /* jquery für erstellung eines neuen tr elements mit dem Value  des select.stateFilter,
    //                                                       der getogglet wurde (.toggle( isClicked ))

    //});
    /*$('option').on('click' , 'option' , statelist);
    var function statelist() {
        var state = $('.filteredStates').val();  //code gesehen mit var rex = new Regexp () ????
       // if (rex == "/all/") { clearFilter() }
        if (state == "/currentState/") {
            $('option.allStates').hide();
            $('option.filteredStates').filter(function() {
                return state.test($(this).text());
            }).show();
            $('option.' + state).toggle();
        } else  {clearFilter ();
        }    
          


        function clearFilter() {
            $('#statelist').val('');
            $('.allStates').show();
        }}*/


    /*//TASK #3
    // getting the totals for each party /erste Aufgabe
    // -> How many of the members belong to D, R or I? looping through array of members getting the value of party and sort them

    //create empty JSON object
    var senate = {
        "R" : [],
        "D" : [],
        "I" : []
    }

    $.each(members, function (i, member){
        senate[member.party].push(member);               //clustered members by party
    })

    console.log("democrats",senate["D"].length);
    console.log("republican", senate["R"].length);
    console.log("independents", senate["I"].length);

    //zweite Aufgabe get average "Votes for each party" for each party

    console.log(senate["I"][0]);
    function getAverageForParty(partyMembers) {
        var totalPartyVotes = 0;
        var totalVotes = 0;

        $.each(partyMember, function(i, partyMember) {
            totalVotes = totalVotes + parseInt(partyMember.total_votes);

            var ownVotes = Math.round(parseInt()partyMember.total_votes) / 100
        })
    }




    //#4
    // gt the bottom 10% of loyalty

    function getLeastLoyalPartyMembers(percentage, partyMembers) {
        partyMembers = partyMembers.sort(function(partyMember1,partyMember2) {
            return partseFloat(partyMember1.votes_with_party_pct) - parseFloat(partyMember2.votes_with_party_pct)
        })
        console.log(partyMembers);  // sorting by percentage

        console.log
    }*/

    var totalMembers = { // construct empty arrays
        "R": [],
        "I": [],
        "D": []
    }
    $.each(members, function(i, member) { // how does computer understands this? how come it differs between R, D and I?
        totalMembers[member.party].push(member);
    })
    $(".totalDemocrats").text(totalMembers.D.length); //selecting elements by class
    $(".totalRepublicans").text(totalMembers.R.length);
    $(".totalIndependents").text(totalMembers.I.length);

    function getAverageVotesForParty(partyMembers) {
        var loyaltyPercentages = 0;
        $.each(partyMembers, function(i, partyMember) {
            loyaltyPercentages = loyaltyPercentages + parseFloat(partyMember.votes_with_party_pct)
        })
        return Math.floor(loyaltyPercentages / partyMembers.length * 100) / 100 + "%"
    }
    $(".totalDemocratsPercentage").text(getAverageVotesForParty(totalMembers.D)) //jquery text() method returns string value of chosen json keys
    $(".totalRepublicansPercentage").text(getAverageVotesForParty(totalMembers.R)) //but how does computer understand totalMembers.D?
    $(".totalIndependentsPercentage").text(getAverageVotesForParty(totalMembers.I))

    //Attendance

    function getLeastEngagedPartyMembers(percentage, members) {
        members = members.sort(function(member1, member2) {
            return parseFloat(member1.missed_votes) - parseFloat(member2.missed_votes);
        })
        return getPercentageOfMembers(percentage, members);
    }

    function getMostEngagedPartyMembers(percentage, members) {
        members = members.sort(function(member1, member2) {
            return parseFloat(member2.missed_votes) - parseFloat(member1.missed_votes);
        })
        return getPercentageOfMembers(percentage, members);
    }

    var mostEngaged = getMostEngagedPartyMembers(0.1, members);
    var leastEngaged = getLeastEngagedPartyMembers(0.1, members);

    //$("#leastEngaged").append(leastEngaged);
//var currentMember = data.results[0].members[i];
    $('#mostEngaged tbody').empty();

    mostEngaged.forEach(function(member, i) {
     //    var name = [member.first_name,member.middle_name,member.last_name].join(" ")
        var row = '<tr>' + '<td>'  + member.first_name +" "+ (member.middle_name || "") +" "+ member.last_name + '</td>' + '<td>' + member.missed_votes + '</td>' + '<td>' + member.missed_votes_pct + ' %' + '</td>' + '</tr>';
        //$('<tr>').append('<td>')
        $('#leastEngaged tbody').append(row);
    });

    //$('#leastEngaged tbody').empty();

    leastEngaged.forEach(function(member,i) {
        var row = '<tr>' + '<td>'  + member.first_name +" "+ (member.middle_name || "") +" "+ member.last_name + '</td>' + '<td>' +member.missed_votes + '</td>' +'<td>' + member.missed_votes_pct + ' %' + '</td>' + '</tr>';
        $('#mostEngaged tbody').append(row);
    });

    // #4
    // get the bottom 10% of loyalty
    function getLeastLoyalPartyMembers(percentage, members) { //troubled with arguments, how does computer know what percentage is?
        members = members.sort(function(member1, member2) {
            return parseFloat(member1.votes_with_party_pct) - parseFloat(member2.votes_with_party_pct);
        })
        return getPercentageOfMembers(percentage, members);
    }



    function getMostLoyalPartyMembers(percentage, members) {
        members = members.sort(function(member1, member2) {
            return parseFloat(member2.votes_with_party_pct) - parseFloat(member1.votes_with_party_pct);
        })
        return getPercentageOfMembers(percentage, members);
    }

    function getPercentageOfMembers(percentage, partyMembers) {
        var partyMembersNeeded = Math.ceil(partyMembers.length * percentage)  //percentage
        var selectedPartyMembers = []
        var i = 0;
        while (selectedPartyMembers.length < partyMembersNeeded) { // while loop loops through a block of code as long as a specified condition is true
            selectedPartyMembers.push(partyMembers[i]);
            if (partyMembers[i].votes_with_party_pct == partyMembers[i + 1].votes_with_party_pct) {
                partyMembersNeeded++;
            }
            i++;
        }
        return selectedPartyMembers;
    }

    var mostLoyal = getMostLoyalPartyMembers(0.1, members);
    var leastLoyal = getLeastLoyalPartyMembers(0.1, members);

    mostLoyal.forEach(function(member, i) {
     //    var name = [member.first_name,member.middle_name,member.last_name].join(" ")
        var row = '<tr>' + '<td>'  + member.first_name +" "+ (member.middle_name || "") +" "+ member.last_name + '</td>' + '<td>' + member.total_votes + '</td>' + '<td>' + member.votes_with_party_pct + ' %' + '</td>' + '</tr>';
        //$('<tr>').append('<td>')
        $('#mostLoyal tbody').append(row);
    });

    //$('#leastEngaged tbody').empty();

    leastLoyal.forEach(function(member,i) {
        var row = '<tr>' + '<td>'  + member.first_name +" "+ (member.middle_name || "") +" "+ member.last_name + '</td>' + '<td>' +member.total_votes + '</td>' +'<td>' + member.votes_with_party_pct + ' %' + '</td>' + '</tr>';
        $('#leastLoyal tbody').append(row);
    });

/*});*/