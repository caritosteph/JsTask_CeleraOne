// url = 'data/data.json';
// var xhr = new XMLHttpRequest();
// xhr.open('get', url, true);
// xhr.responseType = 'json';
// xhr.onload = function(){
//   var status = xhr.status;
//   if(status == 200){
//     console.log("data: ",xhr.response);
//   }
// };

var data = [{ "first_name": "Billy", "last_name": "Campbell", "phone": "62-(500)527-5325" }, { "first_name": "Jonathan", "last_name": "Black", "country": "Russia", "phone": "7-(729)811-4597" }, { "first_name": "cheryl", "last_name": "Harvey", "country": "Indonesia", "phone": "62-(825)454-3810" }, { "first_name": "Cynthia", "last_name": "Cooper" }, { "first_name": "Thomas", "last_name": "Stevens", "phone": "86-(527)535-8464" }, { "first_name": "Jane", "last_name": "Chavez", "country": "Netherlands" }, { "first_name": "bobby", "last_name": "Price", "country": "China", "phone": "86-(898)723-6749" }, { "first_name": "Steve", "last_name": "Hansen", "phone": "93-(362)494-5552" }, { "first_name": "Alan", "last_name": "Cruz", "country": "Philippines", "phone": "63-(617)248-8832" }, { "first_name": "Dennis", "last_name": "Baker", "country": "Iran", "phone": "98-(436)329-3723" }, { "first_name": "Ernest", "last_name": "Bishop", "phone": "86-(566)429-1138" }, { "first_name": "Russell", "last_name": "Meyer", "phone": "62-(687)827-4302" }, { "first_name": "Ryan", "last_name": "Mendoza", "country": "Poland", "phone": "48-(537)109-0373" }, { "first_name": "Maria", "last_name": "Greene", "phone": "92-(831)367-8049" }, { "first_name": "Elizabeth", "last_name": "Moore", "country": "Philippines", "phone": "63-(694)844-9255" }, { "first_name": "Ronald", "last_name": "kim", "phone": "46-(339)931-9221" }, { "first_name": "Samuel", "last_name": "Jacobs", "country": "Russia", "phone": "7-(936)156-5229" }, { "first_name": "Fred", "last_name": "Ross", "phone": "55-(594)481-7354" }, { "first_name": "Andrew", "last_name": "Burns", "country": "Portugal", "phone": "351-(174)443-8706" }, { "first_name": "Robert", "last_name": "Frazier", "country": "Somalia" }];

var DATA_TABLE = {

  init: function() {
      this.headers = this.getHeaders(data);
      this.renderTable(data);
  },
  renderTable: function(data) {
      var table = document.createElement("table");
      var headerTable = this.createHeaderHTML(data);
      var bodyTable = this.createBodyHTML(data);

      table.setAttribute("class", "table");
      table.appendChild(headerTable);
      table.appendChild(bodyTable);
      document.body.appendChild(table);
  },
  createBodyHTML: function(data) {
      var tbody = document.createElement("tbody");
      var headers = this.headers;

      for(var i = 0, size = data.length; i < size; i++) {
          var tr = document.createElement("tr");
          for (var j = 0, sizeHeaders = headers.length; j < sizeHeaders; j++) {
              var td = document.createElement("td");
              var value = data[i][headers[j]] || "";
              var txtBody = document.createTextNode(value);

              td.appendChild(txtBody);
              tr.appendChild(td);
          }
          tbody.id = "myTbody";
          tbody.appendChild(tr);
      }
      return tbody;
  },
  createHeaderHTML: function(data) {
      var headers = this.headers;
      var thead = document.createElement("thead");
      var tr = document.createElement("tr");

      for(var i = 0, size = headers.length; i < size; i++) {
          var th = document.createElement("th");
          var txtHeader = document.createTextNode(headers[i]);
          th.appendChild(txtHeader);
          th.dataset.key = headers[i];
          tr.appendChild(th);
      }
      thead.appendChild(tr);
      thead.style.cursor = "pointer";
      thead.addEventListener("click", this.sortTableByColumn);
      return thead;
  },
  getHeaders: function(data) {
      var headers = [];
      for (var i = 0, size = data.length; i < size; i++) {
        for (var header in data[i]) {
            if (headers.indexOf(header) === -1 && data[i].hasOwnProperty(header)) {
                headers.push(header);
            }
        }
      }
      return headers;
  },
  sortTableByColumn: function(evt) {
      var header = evt.target.dataset.key;
      var nodes = document.getElementById("myTbody").childNodes;
      var sizeNodes = nodes.length;
      var arr = new Array();
      for(var i=0; i<sizeNodes; i++){
        var cells = nodes[i].cells;
        var sizeCells = cells.length;
        arr[i] = new Array();
        for(var cell=0; cell<sizeCells; cell++){
          arr[i][cell] = cells[cell].innerText;
          // console.log("array: ",arr);
        }
      }
      console.log("ARRAY: ",arr);

      arr.sort(function(a,b){
        return a[header] - b[header];
      });
      console.log("sortTAble event: ",evt.target.dataset.key);

    //   sort_by_column(column){
    //    data = document.getElementByClass(table).getChilds();
    //    data.sort(function(a,b){
    //       return data[a]["column"] -  data[b]["column"]
    // 	}
    //    );
    //  }

  }
};

DATA_TABLE.init();
