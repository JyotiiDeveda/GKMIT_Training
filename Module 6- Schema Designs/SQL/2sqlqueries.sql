-- 1. Get all the customers details sorted in scending order by first name.
	select 
		* 
	from 
		"Customer" 
	order by 
		"FirstName";


-- 2. Get the full name of the Customer from customer table in sorted order by first name.
	select 
		CONCAT("FirstName", ' '	,"LastName") as FullName
	from
		"Customer"
	order by 
		"FirstName";


-- 3. Find maximum miliseconds, minimum of all the bytes and sum of unitprice of track table
	select 
		max("Milliseconds") as max_ms,
	    min("Bytes") as min_bytes,
	    sum("UnitPrice") as sum_up
	from 
		"Track";



-- 4. Calculate kilobytes/second using the bytes and milliseconds column of track table.
	-- APproach 1
	select 
		kb/kbsec as kbps 
	from 
		(select
	    "Bytes"/1024 as kb,
	    "Milliseconds"/1000 as kbsec
	  from 
	    "Track");
	-- Used a nested query for the desired output, the sub query gets the kilobytes and seconds 
	-- by converting the bytes to kilobytes and milliseconds to seconds which are used as the columns 
	-- in the outer query that further calculates kilobytes per seconds.


	-- Approach 2: Easier one
	select 
		("Bytes"/1024)/("Milliseconds"/1000)
		as kbps 
	from 
		"Track";


-- 5. Count the number of employees of a city and sort them 
	select
		count("EmployeeId") as cnt, 
	 	"City"
	from
		"Employee"
	group by 
		"City"
	order by 
		"cnt";	-- by cnt
		-- "City"	-- by city


-- 6. Count the number of invoices within a date range from Jan 2009 to March 2009
	-- Approach 1: using extract
	select 
		count("InvoiceId") as NoofInvoices,
	  	sum("Total") as InvoicesSum,
	    cast('Jan 2009 - March 2009' as char(20)) as Range
	from 
		"Invoice"
	where 
		(extract(year from "InvoiceDate") = 2009) and
		(extract(month from "InvoiceDate") >= 1 and extract(month from "InvoiceDate") <= 3);


	-- Approach 2: using between
	select 
		count("InvoiceId") as NoofInvoices,
		sum("Total") as InvoicesSum,
	    cast('Jan 2009 - March 2009' as char(20)) as Range
	from 
		"Invoice"
	where 
		"InvoiceDate" 
	between
		'2009-01-01' and '2009-03-31';

-- 7. Count the number of invoices between jan 2009 and march 2009 for each month and total of invoices
	select 
		count("InvoiceId") as NoofInvoices,
		sum("Total") as InvoicesSum,
  	    extract(month from "InvoiceDate") as Month
	from 
		"Invoice"
	where 
			"InvoiceDate" 
	between
		'2009-01-01' and '2009-03-31'
	group by
	    extract(month from "InvoiceDate");
	 		


 		
 

 		
 


	  





