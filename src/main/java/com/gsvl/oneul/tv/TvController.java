package com.gsvl.oneul.tv;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.common.model.SubKeyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/tv")
public class TvController {
    @Autowired
    private ApplicationContext appCon;


    @GetMapping("/{tvcode}")
    public String goBroadPage(@PathVariable int tvcode, Model model){
        model.addAttribute(Const.TVLIST,(List<SubKeyEntity>) appCon.getBean(Const.TVLIST));
        return "/tv/tvdetail";
    }
}
