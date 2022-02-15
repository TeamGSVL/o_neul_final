package com.gsvl.oneul.jmt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.gsvl.oneul.common.utils.MyKakaoJson;
import com.gsvl.oneul.jmt.model.JmtEntity;
import com.gsvl.oneul.jmt.model.JsonMenuList;
import com.gsvl.oneul.jmt.model.JsonPhotoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.Charset;
import java.util.Arrays;

@Service
public class JmtService {
    @Autowired
    private JmtMapper jmtMapper;
    @Autowired
    private MyKakaoJson myKakaoJson;

    public JmtEntity insJmt(JmtEntity entity){
        JmtEntity resultEntity = selJmt(entity);
        if (resultEntity == null){
            String kakaoJson = myKakaoJson.connectKaKaoJson(entity.getIjmt());

            ObjectMapper om = new JsonMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            JsonNode jsonNode = null;

            String j_catenm = null;
            JsonPhotoList[] photoList= null;
            JsonMenuList[] menuList= null;
            try {
                jsonNode = om.readTree(kakaoJson);
                //경로를 다 찾아서 String.class를 넣어주면 그 경로에 String 값을 뽑아서 보내줌줌

                //카테고리
                try {
                    j_catenm = om.treeToValue(jsonNode.get("basicInfo").get("catename"), String.class);

                    System.out.println("-------------------");
                    System.out.println(j_catenm);
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                } finally {
                }

                //포토리스트
                try {
                    photoList = om.treeToValue(jsonNode.get("photo").get("photoList").get(0).get("list"), JsonPhotoList[].class);

                    System.out.println("-------------------");
                    for (JsonPhotoList list:photoList ){
                        System.out.println(list);
                    }
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                } finally {
                }

                //메뉴리스트
                try {
                    menuList = om.treeToValue(jsonNode.get("menuInfo").get("menuList"), JsonMenuList[].class);
                    System.out.println("-------------------");
                    for (JsonMenuList list:menuList ){
                        System.out.println(list);
                    }
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                } finally {
                }


            } catch (JsonProcessingException e) {

                e.printStackTrace();
            }finally {
                //    int result = jmtMapper.insJmt(entity);
//                    resultEntity = selJmt(entity);
                return resultEntity;
            }



        }
        return resultEntity;
    }
    public JmtEntity selJmt(JmtEntity entity){
        return jmtMapper.selJmt(entity);
    }
    //카카오json페이지 통신
    public String getkakaoJsonPage(int ijmt){
        //ijmt를 카카오 맵에서 가져옴 (id)
        String url = "https://place.map.kakao.com/main/v/"+ijmt;
        System.out.println("ijmt :" + ijmt);
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url).build();

        //레스트 탬플릿 생성
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0,new StringHttpMessageConverter(Charset.forName("UTF-8")));

        final HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON_UTF8));

        HttpEntity<String> entity = new HttpEntity(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,entity,String.class);
        String result = responseEntity.getBody();

        return result;
    }
}
