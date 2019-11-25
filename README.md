# TableScroller
## A little plugin to demonstrate how to make a simple html table sortable and scrollable
### The width of the table is determined by the width of its parent
### I also added a sort 

https://philippemarcmeyer.github.io/tableScroller/index.html

<pre>
  let data =  [
		{"id": 1,"firstname": "Bjarne ","lastname": "Stroustrup","birthdate":new Date(1950,11,30),"langage": "C++","useit":false},
		{"id": 2,"firstname": "Denis","lastname": "Ritchie","birthdate": new Date(1941,8,9),"langage": "C","useit":false},
		{"id": 3,"firstname": "Kenneth","lastname": "Thompson","birthdate": new Date(1943,3,2),"langage": "Go","useit":false},
		{"id": 4,"firstname": "James","lastname": "Gosling","birthdate": new Date(1955,4,19),"langage": "Java","useit":false},
		{"id": 5,"firstname": "Brendan ","lastname": "Eich","birthdate": new Date(1961,3,7),"langage": "Javascript", "note":"my fav","useit":true},
		{"id": 6,"firstname": "Guido","lastname": "Van Rossum","birthdate":new Date(1956,0,31),"langage": "Python","useit":true},
		{"id": 7,"firstname": "Yukihiro","lastname": "Matsumoto","birthdate": new Date(1965,3,14),"langage": "Ruby","useit":false},
		{"id": 8,"firstname": "Roberto","lastname": "Lerusalimschy","birthdate": new Date(1960,4,21),"langage": "Lua","useit":false},
		{"id": 9,"firstname": "Rasmus","lastname": "Lerdorf","birthdate": new Date(1968,10,22),"langage": "Php","useit":true},
		{"id": 10,"firstname": "Jean","lastname": "Ichbiah","birthdate":new Date(1940,2,25),"langage": "Ada","useit":false},
		{"id": 11,"firstname": "Anders","lastname": "Hejlsberg","birthdate": new Date(1960,0,1),"langage": "C#","useit":true}
];

let myTable = $("#tableScroller").tableScroller("init",{"data":data,"options":{"tbodyHeight":"200px"}});
</pre>

it's not perfect and sometimes the header is not aligned with the body...
funny to investigate
