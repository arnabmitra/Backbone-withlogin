package com.amitra.cellar;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
public class UserResource {
	
	UserDAO userDao=new UserDAO();
	
	@POST 
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public User findById(User user) {
		System.out.println("findById " + user.getUserName());
		return userDao.findUser(user.getUserName());
		
	}

}
