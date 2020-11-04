$( document ).ready(function() {

    //I did not know of a better way to do this, just needed to create an agendaItem for every work-day hour
    var agendaItems = ["", "", "", "", "", "", "", "",""];

    var now = moment();

    var currentDay = $("#currentDay");

    currentDay.html(now.format("dddd[,] MMMM Do[,] YYYY"));

    var agenda = $(".agenda");

    // gets items from local storage, not empty, load to agendaItems
    var storedAgendaItems = JSON.parse(localStorage.getItem("agendaItems"));

    console.log(storedAgendaItems);
    if (storedAgendaItems) {
        agendaItems = storedAgendaItems;
    }

    // goes through each of the agendaItems and add appropriate content
    $(agendaItems).each(function(i){
        console.log("i: " + i)

        // just creating all the divs and displaying content
        var form = $("<form>");
        var row = $("<div>");
        row.addClass("row border-bottom h-100 w-100")

        var timeCol = $("<div>");
        timeCol.addClass("col-md-1 time text-right my-auto")

        //do not use moment.js here to get time because of Daylight Savings
        var time = (9 + i) + ":00";

        var timeSpan = $("<span>");
        timeSpan.addClass("");
        timeCol.append(timeSpan);

        // this adds the proper classes for past, present, and future
        if (now.hour() === (i + 9)) {
            row.addClass("present")
        } else if (now.hour() > (i + 9)) {
            row.addClass("past");
        } else {
            row.addClass("future")
        }

        //this displays an hour in every time div
        $(timeSpan).text(time);

        var item =  $("<div>");
        item.addClass("col-md-11 p-0 w-100 h-100 item");

        //adding save buttons
        var saveBtn = $("<button>");
        saveBtn.addClass("saveBtn text-white-50 btn btn-lg")
        saveBtn.attr("type", "submit");
        saveBtn.attr("tabindex", "-1");
        saveBtn.html("<i class='far fa-check-circle'></i>")

        //adding save divs and appending the buttons
        var saveDiv = $("<div>");
        saveDiv.append(saveBtn);
        saveDiv.addClass("col-md-1 my-auto");

        saveDiv.append(saveBtn);

        var textInput = $("<input>");

        textInput.attr("rows", "2");
        textInput.attr("type", "text");
        textInput.addClass("col-md-11 w-100")

        form.addClass("container-fluid p-0 m-0");

        var formRow = $("<div>");
        
        formRow.addClass("row w-100 h-100p-0 m-0")
 
        formRow.append(textInput, saveDiv);

        form.append(formRow);

        item.append(form);

        row.append(timeCol, item);

        value = agendaItems[i];

        //only makes checkmark opaque if agendaItems[i] for that hour has content
        if (agendaItems[i] != "") {
            textInput.parent().addClass("hasContent");
        }

        textInput.val(value);

        agenda.append(row);

        //stores agendaItems in local storage, makes checkmark opaque
        form.on("submit", function(e){
            e.preventDefault();
            agendaItems[i] = textInput.val();
            textInput.parent().addClass("hasContent");
            localStorage.setItem("agendaItems", JSON.stringify(agendaItems));
        })

        //makes checkmark transparent, if the user adds/removes input
        form.on("keydown", function(){
            textInput.parent().removeClass("hasContent");
        })

    })

  });




