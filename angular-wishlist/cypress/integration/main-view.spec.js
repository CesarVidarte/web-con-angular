describe('ventana principal', () => {
    it('tiene titulo correcto en el home', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Ruteo simple');
    });

    it('tiene encabezado correcto y en español por defecto', () => {
        cy.visit('http://localhost:4200');
        cy.contains('angular-wishlist');
        cy.get('h1 b').should('contain', 'HOLA es');
    });
    it('tiene footer correcto', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Actividad');
    });
  });