package application.Models;

import lombok.Data;
import lombok.Getter;

import java.util.HashMap;

@Getter
public class Tool {

    private String id;
    private String imageName;
    private HashMap<String,String> propertyList;

    public Tool() {
        this.propertyList = new HashMap<>();
    }

    public String getToolImg(){
        return this.imageName;
    }
}