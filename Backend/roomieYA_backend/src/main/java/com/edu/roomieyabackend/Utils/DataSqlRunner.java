package com.edu.roomieyabackend.Utils;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DataSqlRunner implements CommandLineRunner {

    private final DataSource dataSource;

    public DataSqlRunner(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        ScriptUtils.executeSqlScript(dataSource.getConnection(), new ClassPathResource("data.sql"));
    }
}
