
## Marshall Webapp Release Notes

**v3.0.9 - January 11, 2021**

* **FEATURE** documentation for the marshall webapp is on [readthedocs](https://marshall-webapp.readthedocs.io/en/master/). This is mainly for developer reference so far.
* **FIXED** the context visualisation is now displaying correctly to show all sherlock crossmatches (see context tab on transient tickets)

**v3.0.8 - December 15, 2020**

* **REFACTOR** added ability to set classification priority when moving ticket to classification list
* **FIXED** fixing cache links so images appear and downloads work correctly

**v3.0.7 - December 4, 2020**

* **REFACTOR** settings files clean up and consolidation
* **FIXED** classification bug squashed

**v3.0.6 - December 4, 2020**

* **REFACTOR** moved a sherlock book-keeping query from front-end code to database procedure. Should decrease page load times.
* **FIXED** sorting lists on 'latest comment'.

**v3.0.5 - December 3, 2020**

* **FIXED** date formats, broken aka links, broken stats pages and broken table view

**v3.0.4 - December 2, 2020**

* **FIXED** comment function (legacy unicode fix)

**v3.0.3 - December 2, 2020**

* **FIXED** search function

**v3.0.2 - November 17, 2020**

* **Enhancement** added config files for cluster
* **Enhancement** added ability to connect to a non-standard database port issue

**v3.0.1 - July 6, 2020**

* **Fixed** unittest database import metadata lock issue
* **Fixed** bug in search resource

**v3.0.0 - June 25, 2020**

* Now compatible with Python 3.*
