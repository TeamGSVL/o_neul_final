package com.gsvl.oneul.tv;

import com.gsvl.oneul.tv.model.TvDto;
import com.gsvl.oneul.tv.model.TvEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TvService {
    @Autowired
    TvMapper mapper;

    // tv 식당 list return
    public List<TvEntity> selTvList(int tvcode, TvDto dto) {
        System.out.println("Service entity : " + tvcode);
        System.out.println("TvDto : " + dto);
        dto.setT_pro(tvcode);
        // http://localhost:8090/tv/1 는 파라미터가 없음
        if(dto.getCurpage() == 0) {
            dto.setCurpage(1);
        }

        // 한 페이지당 식당리스트 갯수
        dto.setRecordcount(10);
        // DB 를 위한 페이지셋팅
        dto.setRowcnt((dto.getCurpage() - 1) * dto.getRecordcount());
        return mapper.selTvList(dto);
    }

    // maxpage return
    public int selMaxPage(int tvcode) {
        TvDto dto = new TvDto();
        dto.setT_pro(tvcode);
        dto.setRecordcount(10);
        return mapper.selMaxPage(dto);
    }

}
