package com.amitra.cellar;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class UserDAO {

	 public User findUser(String userName) {
	        User user = new User();
	        Connection c = null;
	    	String sql = "SELECT * FROM user where user_name = ?";
	        try {
	            c = ConnectionHelper.getConnection();
	            PreparedStatement ps = c.prepareStatement(sql);
	            ps.setString(1,userName);
	            ResultSet rs = ps.executeQuery();
	            while (rs.next()) {
	                user=processRow(rs);
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	            throw new RuntimeException(e);
			} finally {
				ConnectionHelper.close(c);
			}
	        return user;
	    }
	 
	 protected User processRow(ResultSet rs) throws SQLException {
	        User user = new User();
	        user.setId(rs.getInt("id"));
	        user.setUserName(rs.getString("user_name"));
	        user.setPassword(rs.getString("password"));
	      
	        return user;
	    }

	 
}
