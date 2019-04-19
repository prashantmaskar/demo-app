<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Common_Model extends CI_Model {
 
    /* function to get global setttings from the database */

    public function getGlobalSettings() {
        $global = array();
        $this->db->select('globalval.*');
        $this->db->from('global_settings as globalval');

        $result = $this->db->get();
        foreach ($result->result_array() as $row) {
            $global[$row['meta_key']] = $row['meta_value'];
        }
        return $global;
    }

    /* common function to get records from the database table */

    public function getRecords($table, $fields = '', $condition = '', $order_by = '', $limit = '', $debug = 0) {
        $str_sql = '';
        if (is_array($fields)) { /* $fields passed as array */
            $str_sql.=implode(",", $fields);
        } elseif ($fields != "") { /* $fields passed as string */
            $str_sql .= $fields;
        } else {
            $str_sql .= '*';  /* $fields passed blank */
        }
        $this->db->select($str_sql, FALSE);
        if (is_array($condition)) { /* $condition passed as array */
            if (count($condition) > 0) {
                foreach ($condition as $field_name => $field_value) {
                    if ($field_name != '' && $field_value != '') {
                        $this->db->where($field_name, $field_value);
                    }
                }
            }
        } else if ($condition != "") { /* $condition passed as string */
            $this->db->where($condition);
        }
        if ($limit != "") {
            $this->db->limit($limit); /* limit is not blank */
        }
        if (is_array($order_by)) {
            $this->db->order_by($order_by[0], $order_by[1]);  /* $order_by is not blank */
        } else if ($order_by != "") {
            $this->db->order_by($order_by);  /* $order_by is not blank */
        }
        $this->db->from($table);  /* getting record from table name passed */

        $query = $this->db->get(); //echo $this->db->last_query();
        if ($debug) {
            die($this->db->last_query());
        }
        $res_data = array();
        if ($query !== FALSE && $query->num_rows() > 0) {
            $res_data = $query->result_array();
        }
        return $res_data;
    }

    /* insert record into the database */

    public function insertRow($insert_data, $table_name) {
        $this->db->insert($table_name, $insert_data);
        return $this->db->insert_id();
    }

    public function updateRow($table_name, $update_data, $condition) {

        if (is_array($condition)) {
            if (count($condition) > 0) {
                foreach ($condition as $field_name => $field_value) {
                    if ($field_name != '' && $field_value != '' && $field_value != NULL) {
                        $this->db->where($field_name, $field_value);
                    }
                }
            }
        } else if ($condition != "" && $condition != NULL) {
            $this->db->where($condition);
        }
        $this->db->update($table_name, $update_data);
    }

    public function deleteRows($arr_delete_array, $table_name, $field_name) {
        if (count($arr_delete_array) > 0) {
            foreach ($arr_delete_array as $id) {
                if ($id) {
                    $this->db->where($field_name, $id);
                    $query = $this->db->delete($table_name);
                }
            }
        }
    }
}
