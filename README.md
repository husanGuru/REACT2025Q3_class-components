# You can use ready json file for faster checks

uncomment necessary lines in src\api\co2.ts

# Initial Profiling with React Dev Tools Profiler

search by name: 14.4 ms
sorting: 121.4 ms
filtering by year: 13.1 ms
updating columns: 785.3 ms

Initial Load:
![alt text](profiler/before/initial.png)
Initial Load (ranked):
![alt text](profiler/before/initial_ranked.png)

Search: ![alt text](profiler/before/search.png)
Sorting: ![alt text](profiler/before/sort.png)
Filtering by year: ![alt text](profiler/before/filter_year.png)
updating columns: ![alt text](profiler/before/columns.png)

# Update the App with React.memo and useMemo

search by name: 14.4 ms
sorting: 121.4 ms
filtering by year: 13.1 ms
updating columns: 785.3 ms

Initial Load:
![alt text](profiler/after/initial.png)
Initial Load (ranked):
![alt text](profiler/after/initial_ranked.png)

Search: ![alt text](profiler/after/search.png)
Sorting: ![alt text](profiler/after/sort.png)
Filtering by year: ![alt text](profiler/after/filter_year.png)
updating columns: ![alt text](profiler/after/columns.png)