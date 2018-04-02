package com.example.controller;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.pojo.ConnectionMapper;

@RestController
public class SqlRestController {
	
	@RequestMapping(value = "postMappingData.do", method = RequestMethod.POST)
	public Map testConnection(@RequestBody ConnectionMapper connectionMapper) {
		boolean connection = true;
		Map<String, Boolean> resposemap = new HashMap<>();
		try {
			String connectionUrl = getConnectionUrl(connectionMapper.getDataBaseName(),
					connectionMapper.getPortNumber());
			Class.forName(connectionUrl);
			DriverManager.getConnection(connectionUrl, connectionMapper.getUserName(), connectionMapper.getPassword());
		} catch (ClassNotFoundException | SQLException e) {
			connection = false;
		}
		resposemap.put("success", connection);
		return resposemap;
	}

	private String getConnectionUrl(String dbName, Integer portNumber) {
		String url = "jdbc:mysql://localhost:" + portNumber + "/" + dbName;
		return url;
	}

}
