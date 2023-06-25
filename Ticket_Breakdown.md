# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1:

Create a new table to get reports by custom id.

#### Description: Create a new table called reports in order to get reports by custom id.

#### Acceptance Criteria:

- Reports table should have customAgentId
- customAgentId should be nullable.
  Implementation Details:
- Create a new table called reports.
- Add FacilityId(foreign key), CustomAgentId(string), AgentId(foreign key)

#### Estimation: 2 hours

#### Tshirt size: XS

### Ticket 2:

Create a RESTful endpoint for generating reports for custom agent ids  
Description: Create a POST endpoint that generates reports based on the customAgentId in the request payload.

#### Acceptence Criteria:

- Only authenticated users should be able to create reports.
- Users should be able to give custom agent id.
- Custom agent should be required to generate reports.

#### Implementation Details:

- Create a new RESTful reports endpoint with the following information.

##### Example Request:

POST /report/{facilityId}/{agentId}

```{
  header: {
    "Authorization": Bearer {token}
  },
  body: {
    customAgentId: string (required)
  }
}
```

##### Example Response:

```{
  success: boolean,
  data: {
    facilityId: string
    agentId: string
    customAgentId: string
  }
}
```

#### Estimation: 6 hours

#### Tshirt size: S

### Ticket 3

Create an endpoint to get reports
Description: Create a RESTful endpoint that returns reports with the customAgentId
Acceptence Criteria

- Only authenticated users should be able to retrieve reports.
- Users see explanatory error messages when they couldn't get the reports.
  Implementation Details:
- Create a new RESTful report endpoint with the following information

##### Example request:

GET /reports/{customAgentId}

```{
  header: {
    "Authorization": Bearer {token}
  }
}
Example Response:
{
  data: {
    reports: [
      {
        Shift
      }
    ]
  }
}
```

- Implemented a cache solution

#### Estimation: 6 hours

#### Tshirt Size: S
