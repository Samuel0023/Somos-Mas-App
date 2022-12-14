const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { User } = require('../database/models');

describe('User endpoint tests', () => {
    let userToken, adminToken;
  
    before(async () => {
      const adminLoginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'usuarioadmin1@mail.com',
          password: 'ABCZ_efgi_1230',
        })
        .expect(200);
        
      adminToken = adminLoginResponse.body.body;
    }),
    before(async () => {
      const userLoginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'usuariocomun4@mail.com',
          password: 'ABCD_efgh_1234',
        })
        .expect(200);
  
      userToken = userLoginResponse.body.body;
    });
    before(async () => {
      const userLoginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'usuariocomun4@mail.com',
          password: 'ABCD_efgh_1234',
        })
        .expect(200);
  
      userToken = userLoginResponse.body.body;
    });
  
    describe('Users tests on success', () => {
      describe('[GET - /users]', () => {
        it('Should return all users', async () => {
          const response = await request(app)
          .get('/users')
          .set('Authorization', `Bearer ${adminToken}`)
  
          expect(response.statusCode).to.equal(200);
  
          expect(response.body)

        });
      });
  
      describe('[PUT - /users/:id]', () => {
        it('should update a user', async () => {
          const response = await request(app)
            .put('/users/14')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              photo: 'https://image.com/image.jpg',
            })
  
          expect(response.statusCode).to.equal(200);
          expect(response.body)

        });
      });
  
      describe('[DELETE - /users/:id', () => {
        it('should return an user deleted successfully', async () => {
          const response = await request(app)
            .delete('/users/14')
            .set('Authorization', `Bearer ${userToken}`);
  
          expect(response.statusCode).to.equal(200);
  
          expect(response.body).to.have.property('body');
         
        });
      });
    });

    after(async () => {
      await User.restore({ where: {id: 14}});
    }),
  
    describe('Users tests on failure', () => {
      before(async () => {
        const userLoginResponse = await request(app)
          .post('/auth/login')
          .send({
            email: 'usuariocomun2@mail.com',
            password: 'ABCD_efgh_1234',
          })
          .expect(200);
    
        userToken = userLoginResponse.body.body;
      });
      describe('[GET - /users]', () => {
        it('should return 401 if no token provided', async () => {
          const response = await request(app)
          .get('/users')
  
          expect(response.statusCode).to.equal(401);
        });
  
        it('should return 403 if user is not an admin', async () => {
          const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${userToken}`);
  
          expect(response.statusCode).to.equal(403);
        });

      });
  
      describe('[PUT - /users/:id]', () => {
        it('should return 401 if user try to edit another user', async () => {
            const response = await request(app)
              .put('/users/999')
              .set('Authorization', `Bearer ${userToken}`);
          
            expect(response.statusCode).to.equal(401);
          });
      });
  
      describe('[DELETE - /users/:id', () => {
        it('should return 401 if user try to delete another user', async () => {
          const response = await request(app)
            .delete('/users/9999999999')
            .set('Authorization', `Bearer ${userToken}`)
        
  
          expect(response.statusCode).to.equal(401);
        });
  
        
  })
})
});