# **ChemistWarehouseTest** - .NET 5 / Angular 12 project

## Prerequisite 
* Visual Studio 2019
* .NET 5 SDK
* Angular CLI

## Backend

Setup database
* Update connection string to SQL Server in appsettings.json
* Change directory to `.\backend`
* Run `dotnet ef database update --project ChemistWarehouse.TechnicalTest.EntityFramework\ChemistWarehouse.TechnicalTest.EntityFramework.csproj --startup-project ChemistWarehouse.TechnicalTest.Api\ChemistWarehouse.TechnicalTest.Api.csproj` to migrate the database.

Run the backend using command line
* Change directory to `.\backend`
* Run `dotnet build` to build the solution.
* 

Run the backend using Visual Studio
* Run project ChemistWarehouseTest.Api. The application will run on port 59045 (HTTP) and 44327 (HTTPS)


## Frontend

Run `npm install` to install dependencies.

Update `baseApiUrl` in `src\environments\environment.ts` with the port the backend application is running on

Run `ng serve` to run the frontend in development mode. The default port is 4200. Run `ng serve --port <PORT NUMBER>` if you want to run using a different port. Note that you will need update appsettings.json file in .NET Web project to allow CORS for the chosen port. 