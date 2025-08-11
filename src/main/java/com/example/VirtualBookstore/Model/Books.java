package com.example.VirtualBookstore.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String Description;
    private String release_date;
    @Column(name = "Price")
    private int price;
    private String ImageName;
    private String ImageType;
    @Lob
    private byte[] imageData;
    @OneToMany(mappedBy = "book")
    @JsonIgnore
    private List<UserBook> userBooks;

}
