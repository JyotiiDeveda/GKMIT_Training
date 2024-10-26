-- Solution of problem statements on postgres practice website kept for reference 

SELECT
  distinct YEAR("birth_date") as "birth_date"
from "patients"
order by "birth_date";


select "first_name"
from (
    SELECT
      "first_name",
      count("patient_id") as "PatientCnt"
    from "patients"
    group by "first_name"
  )
where "PatientCnt" = 1;


-- practice postgres
1.select 
    starttime 
  from cd.bookings, cd.members 
  where 
    cd.members."memid"=cd.bookings.memid and 
    (cd.members.firstname || ' ' || cd.members.surname = 'David Farrell');


  select vt.starttime as starttime 
  from 
    (
        select
        cd.members.firstname as firstname, 
          cd.members.surname as surname, 
          cd.bookings.starttime as starttime 
      from cd.members join 
        cd.bookings on cd.members.memid = cd.bookings.memid 
    ) as vt
  where vt.firstname || ' ' || vt.surname = 'David Farrell';


2. 
select firstname, surname from cd.members join
 (
  select distinct
    recommendedby 
  from 
    cd.members  
  ) as vt
 on cd.members.memid=vt.recommendedby
 order by (surname, firstname);


select firstname, surname from cd.members,
 (
  select distinct
    recommendedby 
  from 
    cd.members  
  ) as vt
 where cd.members.memid=vt.recommendedby
 order by (surname, firstname);

