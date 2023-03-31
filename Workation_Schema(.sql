CREATE TABLE Workation(
	Ranking INT PRIMARY KEY NOT NULL,
	City VARCHAR(30) NOT NULL,
	Country VARCHAR(30) NOT NULL,
	Lat DEC NOT NULL,
	Lng DEC NOT NULL,
	Avg_WiFi_Speed_Mbps INT NOT NULL,
	No_Coworking_Spaces INT NOT NULL,
	Avg_Coffee_$ DEC NOT NULL,
	Avg_Taxi_$_km DEC NOT NULL,
	Avg_Beer_$_2 DEC NOT NULL,
	Avg_Rent_1BR_$_mo DEC NOT NULL,
	Avg_Restaurant_$ DEC NOT NULL,
	Avg_Sunshine_hr_yr INT NOT NULL,
	No_TripAdvisor_Attractions INT NOT NULL,
	No_Instagram_Photos INT NOT NULL,
	Air_Quality DEC,
	Water_Pollution DEC
);