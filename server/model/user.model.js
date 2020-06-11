module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	  name: {
		type: Sequelize.STRING
	  },
	  family_name: {
		type: Sequelize.STRING
	  },
	  password : {
		  type: Sequelize.STRING
      },
      last_login_date: {
		type: Sequelize.DATE
      },
      created_at: {
		type: Sequelize.DATE
      },
      update_at: {
		type: Sequelize.DATE
	  }
      
	});
	
	return User;
}