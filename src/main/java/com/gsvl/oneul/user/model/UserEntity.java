package com.gsvl.oneul.user.model;

import lombok.*;


@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity{
    private int iuser;
    private int u_pfnum;
    private String u_id;
    private String u_pw;
    private String u_nm;
    private String u_profileimg;
    private String u_email;
    private String u_rdt;
    private String u_mdt;
    private String auth;


}
