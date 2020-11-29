<?php
namespace App\Includes;

class GetUrlMetaData {
    function getCurrentUrlMetaData($url) {
        $tags = get_meta_tags($url);


        //we either get sailthru_value or twitter:value
        if (isset($tags['twitter:title']) && isset($tags['twitter:site']) && isset($tags['twitter:image'])){
            $img = $tags['twitter:image'];
            $site = $tags['twitter:site'];
            $title = $tags['twitter:title'];

            $parsedTags = array(
                'img' => $img, 
                'title' => $title,
                'imageAndTitleFound' => true
            );
            return $parsedTags;
        }
        else{
            $tags['imageAndTitleFound'] = false;
            return $tags;
        }
        
        

       
        /*
        $result = false;
        
        $contents = getUrlContents($url);
        
        if (isset($contents) && is_string($contents)) {
            $title = null;
            $metaTags = null;
        
            preg_match('/<title>([^>]*)<\/title>/si', $contents, $match);
        
            if (isset($match) && is_array($match) && count($match) > 0) {
                $title = strip_tags($match[1]);
            }
        
            preg_match_all('/<[\s]*meta[\s]*name="?' . '([^>"]*)"?[\s]*' . 'content="?([^>"]*)"?[\s]*[\/]?[\s]*>/si', $contents, $match);
        
            if (isset($match) && is_array($match) && count($match) == 3) {
                $originals = $match[0];
                $names = $match[1];
                $values = $match[2];
        
                if (count($originals) == count($names) && count($names) == count($values)) {
                    $metaTags = array();
        
                    for ($i = 0, $limiti = count($names); $i < $limiti; $i++) {
                        $metaTags[$names[$i]] = array(
                            'html' => htmlentities($originals[$i]),
                            'value' => $values[$i]
                        );
                    }
                }
            }
        
            $result = array(
                'title' => $title,
                'metaTags' => $metaTags
            );
        }
        return $result;}
        
        function getUrlContents($url, $maximumRedirections = null, $currentRedirection = 0) {
        $result = false;
        
        $contents = @file_get_contents($url);
        
        // Check if we need to go somewhere else
        
        if (isset($contents) && is_string($contents)) {
            preg_match_all('/<[\s]*meta[\s]*http-equiv="?REFRESH"?' . '[\s]*content="?[0-9]*;[\s]*URL[\s]*=[\s]*([^>"]*)"?' . '[\s]*[\/]?[\s]*>/si', $contents, $match);
        
            if (isset($match) && is_array($match) && count($match) == 2 && count($match[1]) == 1) {
                if (!isset($maximumRedirections) || $currentRedirection < $maximumRedirections) {
                    return getUrlContents($match[1][0], $maximumRedirections, ++$currentRedirection);
                }
        
                $result = false;
            } else {
                $result = $contents;
            }
        }
        
        return $contents;}
        */
}}
