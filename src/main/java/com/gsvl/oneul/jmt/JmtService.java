package com.gsvl.oneul.jmt;

import com.gsvl.oneul.jmt.model.KakaoJsonEntity;
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

    public int insJmt(String iKao){
        KakaoJsonEntity entity = new KakaoJsonEntity();
        entity.setIjmt(Integer.parseInt(iKao));


        if (selJmt(entity) == null){
            int result = jmtMapper.insJmt(entity);
        }

        return 0;
    }
    public KakaoJsonEntity selJmt(KakaoJsonEntity entity){
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
