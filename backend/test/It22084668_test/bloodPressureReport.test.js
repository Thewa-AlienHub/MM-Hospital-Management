import request from 'supertest';
import app from '../../server.js'; // Adjust the path to your server file
import BloodPressureReport from '../../models/IT22084668_Models/BloodPressureReport.Model.js'; // Adjust the path as needed
import { expect } from 'chai';

describe('Blood Pressure Report API', () => {
  
  

  it('should create a new blood pressure report', async () => {
    const reportData = { ID: '12345678', Name: 'Test User', Systolic: '120', Diastolic: '80' };
    
    const response = await request(app)
      .post('/api/bloodpressurereport/addBloodPressureReport')
      .send(reportData);
    
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('message', 'Report created successfully');
    expect(response.body.report).to.have.property('ID', reportData.ID);
    expect(response.body.report).to.have.property('Name', reportData.Name);
    expect(response.body.report).to.have.property('Systolic', reportData.Systolic);
    expect(response.body.report).to.have.property('Diastolic', reportData.Diastolic);
  });

  it('should get the latest blood pressure report for a given user ID', async () => {
    const reportData = { ID: '12345678', Name: 'Test User', Systolic: '120', Diastolic: '80' };
    await new BloodPressureReport(reportData).save();

    const response = await request(app)
      .get('/api/bloodpressurereport/getLatestBloodPressureReport/12345678');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('ID', reportData.ID);
  });

  it('should update an existing blood pressure report', async () => {
    const reportData = { ID: '12345678', Name: 'Test User', Systolic: '120', Diastolic: '80' };
    const report = await new BloodPressureReport(reportData).save();

    const updateData = { Systolic: '130', Diastolic: '85' };
    const response = await request(app)
      .put(`/api/bloodpressurereport/updateBloodPressureReport/${report._id}`) // Use `_id` here
      .send(updateData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Report updated successfully');
    expect(response.body.report).to.have.property('Systolic', updateData.Systolic);
    expect(response.body.report).to.have.property('Diastolic', updateData.Diastolic); // You can check for Diastolic too
});


  it('should delete a blood pressure report by ID', async () => {
    const reportData = { ID: '12345678', Name: 'Test User', Systolic: '120', Diastolic: '80' };
    const report = await new BloodPressureReport(reportData).save();

    const response = await request(app)
      .delete(`/api/bloodpressurereport/deleteBloodPressureReport/${report._id}`); // Use `_id` here

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Report deleted successfully');
  });

  it('should return an error when getting the latest blood pressure report for a non-existent user ID', async () => {
    const invalidID = '99999999'; // A user ID that doesn't exist in the database
  
    const response = await request(app)
      .get(`/api/bloodpressurereport/getLatestBloodPressureReport/${invalidID}`);
  
    expect(response.status).to.equal(404); // Assuming a 404 status for not found
    expect(response.body).to.have.property('message', 'No report found for this ID'); // Assuming the error message returned
  });
  
});
